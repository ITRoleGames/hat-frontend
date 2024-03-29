import {Middleware, MiddlewareAPI} from "redux"
import {connectedAction, connectingAction, EventActionType} from "../actions/event.actions";
import {
    BufferEncoders,
    encodeBearerAuthMetadata,
    encodeCompositeMetadata,
    encodeRoute,
    IdentitySerializer,
    JsonSerializer,
    MAX_STREAM_ID,
    MESSAGE_RSOCKET_AUTHENTICATION,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,
    RSocketClient
} from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {ISubscription} from "rsocket-types/ReactiveStreamTypes";
import {ReactiveSocket} from "rsocket-types";
import {GameApi} from "../api/game.api";
import {Game} from "../model/game.model";
import {AxiosError} from "axios";
import {UserApi} from "../api/user.api";
import {
    getGameUsersActionFailed,
    getGameUsersActionPending,
    getGameUsersActionSuccess
} from "../slice/game-users.slice";
import {GetUsersResponse} from "../dto/get-users-response";
import {getAccessToken} from "./local-storage";
import {GameStatus} from "../model/game-status";
import {RoundApi} from "../api/round.api";
import {Round} from "../model/round.model";
import {
    getLatestRoundActionFailed,
    getLatestRoundActionPending,
    getLatestRoundActionSuccess
} from "../slice/round.slice";
import {logInfo} from "../utils/logging.utils";
import {getGameActionFailed, getGameActionPending, getGameActionSuccess} from "../slice/game.slice";

const webSocketMiddleware: Middleware = store => {

    return next => action => {

        const connecting = store.getState().eventState.connecting;
        const connected = store.getState().eventState.connected;
        const gameId = store.getState().game.game?.id;
        const userId = store.getState().user.user?.id;
        if (
            gameId
            && !connected
            && !connecting
            && action.type != EventActionType.CONNECTING
            && action.type != EventActionType.CONNECTED
        ) {
            store.dispatch(connectingAction())
            connect(gameId, userId, store)
        }

        next(action);
    }
}

const rsocketUrl = () => {
    if (process.env.REACT_APP_WEBSOCKET_URL) {
        return process.env.REACT_APP_WEBSOCKET_URL
    } else {
        const url = new URL("rsocket", window.location.href);
        url.protocol = url.protocol.replace("http", "ws");
        return url.href;
    }
}

const connect = (gameId: string, userId: string, store: MiddlewareAPI) => {

    const users = store.getState().gameUsers.users;
    const route = `/games/${gameId}/user/${userId}`;
    const accessToken = getAccessToken();
    if (accessToken == null) return
    const client = new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer
        },
        setup: {
            keepAlive: 60000,
            lifetime: 180000,
            dataMimeType: "application/json",
            metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
            payload: {
                metadata: encodeCompositeMetadata([
                    [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)],
                    [MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(accessToken)],
                ])
            }
        },
        transport: new RSocketWebSocketClient({
            url: rsocketUrl()
        }, BufferEncoders)
    });

    const errorHandler = (e: any) => console.error(e);

    const responseHandler = (payload: any) => {
        logInfo("New WS event received")
        const gameEvent = payload.data
        if (gameEvent.type == "GAME_UPDATED" && gameEvent.actorUserId != userId) {

            const gameState = store.getState().game;
            if (gameState.game.status == GameStatus.STARTED) {
                store.dispatch(getLatestRoundActionPending());
                RoundApi.getLatestRound(gameState.game.id).then((resp: Round | undefined) => {
                    if (resp) {
                        store.dispatch(getLatestRoundActionSuccess(resp));
                    } else {
                        store.dispatch(getLatestRoundActionFailed("not found"));
                    }
                }).catch((error: AxiosError) => store.dispatch(getLatestRoundActionFailed(error.message)));
            } else {
                store.dispatch(getGameActionPending());
                GameApi.getGame(gameId).then((game: Game) => {
                    store.dispatch(getGameActionSuccess(game));
                    store.dispatch(getGameUsersActionPending(users));
                    UserApi.getUsers(game.players.map(p => p.userId)).then((resp: GetUsersResponse) => {
                        store.dispatch(getGameUsersActionSuccess(resp.users));
                    }).catch((error: AxiosError) => store.dispatch(getGameUsersActionFailed(error.message)));
                }).catch((error: AxiosError) => store.dispatch(getGameActionFailed(error.message)));
            }
        }
    }

    const requester = (reactiveSocket: ReactiveSocket<any, any>) => {
        reactiveSocket.requestStream({
            metadata: encodeCompositeMetadata([
                [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)]
            ])
        }).subscribe({
            onError: errorHandler,
            onNext: responseHandler,
            onSubscribe: (subscription: ISubscription) => {
                console.log("RSocket connection established");
                store.dispatch(connectedAction())
                subscription.request(MAX_STREAM_ID);
            },
            onComplete: () => {
                console.log("RSocket subscription complete")
            }
        })
    }

    client.connect().then(reactiveSocket => {
        requester(reactiveSocket);
    }, errorHandler);
}

export default webSocketMiddleware;
