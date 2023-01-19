import {Middleware, MiddlewareAPI} from "redux"
import {connectingAction, EventActionType} from "../actions/event.actions";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {getGameActionFailed, getGameActionPending, getGameActionSuccess} from "../actions/game.action";
import {GameApi} from "../api/game.api";
import {Game} from "../model/game.model";
import {AxiosError} from "axios";
import {UserApi} from "../api/user.api";
import {User} from "../model/user.model";
import {
    getGameUsersActionFailed,
    getGameUsersActionPending,
    getGameUsersActionSuccess
} from "../slice/game-users.slice";

const webSocketMiddleware: Middleware = store => {

    let stompClient: CompatClient;

    return next => action => {

        const connecting = store.getState().eventState.connecting;
        const connected = store.getState().eventState.connected;
        const gameId = store.getState().game.game?.id;
        if (
            gameId
            && !connected
            && !connecting
            && action.type != EventActionType.CONNECTING
            && action.type != EventActionType.CONNECTED
        ) {
            store.dispatch(connectingAction())
            stompClient = connect(gameId, store)
        }

        next(action);
    }
}

const connect = (gameId: string, store: MiddlewareAPI): CompatClient => {
    const users = store.getState().gameUsers.users;
    const socket = new WebSocket("ws://localhost:9002/api/v1/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/game/${gameId}`, function (msg) {
            const gameEvent = JSON.parse(msg.body)
            if (gameEvent.type == "GAME_UPDATED") {
                store.dispatch(getGameActionPending());
                GameApi.getGame(gameId).then((game: Game) => {
                    store.dispatch(getGameActionSuccess(game));

                    store.dispatch(getGameUsersActionPending(users));
                    UserApi.getUsers(game.users).then((users: User[]) => {
                        store.dispatch(getGameUsersActionSuccess(users));
                    }).catch((error: AxiosError) => store.dispatch(getGameUsersActionFailed(error.message)));
                }).catch((error: AxiosError) => store.dispatch(getGameActionFailed(error.message)));
            }
        });

        stompClient.reconnect_delay = 1000

        // stompClient.disconnect(()=>{
        //     setTimeout(function() {
        //         console.log("reconnecting...")
        //         connect();
        //     }, 1000);
        // })
        //
        // stompClient.one
    })

    return stompClient
}

export default webSocketMiddleware;