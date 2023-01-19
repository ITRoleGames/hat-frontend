import {GameApi} from "api/game.api";
import {AxiosError} from "axios";
import {CreateGameData} from "model/create-game-data.model";
import {Game} from "model/game.model";
import {AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {clearGameIdInLocalStorage, registerGameIdInLocalStorage} from "../service/local-storage";
import {clearGameUsersAction} from "../slice/game-users.slice";

export enum GameActionType {
    GET_GAME_SUCCESS = "GET_GAME_SUCCESS",
    GET_GAME_PENDING = "GET_GAME_PENDING",
    GET_GAME_FAILED = "GET_GAME_FAILED",
    CREATE_GAME_SUCCESS = "CREATE_GAME_SUCCESS",
    CREATE_GAME_PENDING = "CREATE_GAME_PENDING",
    CREATE_GAME_FAILED = "CREATE_GAME_FAILED",
    JOIN_GAME_SUCCESS = "JOIN_GAME_SUCCESS",
    JOIN_GAME_PENDING = "JOIN_GAME_PENDING",
    JOIN_GAME_FAILED = "JOIN_GAME_FAILED",
}

interface CreateGameActionSuccess {
    type: GameActionType.CREATE_GAME_SUCCESS;

    payload: Game;
}

interface CreateGameActionPending {
    type: GameActionType.CREATE_GAME_PENDING;
}

interface CreateGameActionFailed {
    type: GameActionType.CREATE_GAME_FAILED;

    error: string;
}

interface JoinGameActionSuccess {
    type: GameActionType.JOIN_GAME_SUCCESS;

    payload: Game;
}

interface JoinGameActionPending {
    type: GameActionType.JOIN_GAME_PENDING;
}

interface JoinGameActionFailed {
    type: GameActionType.JOIN_GAME_FAILED;

    error: string;
}

interface GetGameActionSuccess {
    type: GameActionType.GET_GAME_SUCCESS;

    payload: Game;
}

interface GetGameActionPending {
    type: GameActionType.GET_GAME_PENDING;
}

interface GetGameActionFailed {
    type: GameActionType.GET_GAME_FAILED;

    error: string;
}

export type GameAction =
    CreateGameActionPending
    | CreateGameActionSuccess
    | CreateGameActionFailed
    | JoinGameActionPending
    | JoinGameActionSuccess
    | JoinGameActionFailed
    | GetGameActionPending
    | GetGameActionSuccess
    | GetGameActionFailed;

export const createGameActionSuccess = (game: Game): CreateGameActionSuccess => {
    return {type: GameActionType.CREATE_GAME_SUCCESS, payload: game};
};

export const createGameActionPending = (): CreateGameActionPending => {
    return {type: GameActionType.CREATE_GAME_PENDING};
};

export const createGameActionFailed = (error: string): CreateGameActionFailed => {
    return {type: GameActionType.CREATE_GAME_FAILED, error: error};
};

export const joinGameActionSuccess = (game: Game): JoinGameActionSuccess => {
    return {type: GameActionType.JOIN_GAME_SUCCESS, payload: game};
};

export const joinGameActionPending = (): JoinGameActionPending => {
    return {type: GameActionType.JOIN_GAME_PENDING};
};

export const joinGameActionFailed = (error: string): JoinGameActionFailed => {
    return {type: GameActionType.JOIN_GAME_FAILED, error: error};
};

export const getGameActionSuccess = (game: Game): GetGameActionSuccess => {
    return {type: GameActionType.GET_GAME_SUCCESS, payload: game};
};

export const getGameActionPending = (): GetGameActionPending => {
    return {type: GameActionType.GET_GAME_PENDING};
};

export const getGameActionFailed = (error: string): GetGameActionFailed => {
    return {type: GameActionType.GET_GAME_FAILED, error: error};
};

export const createGameAction = (data: CreateGameData): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(clearGameUsersAction())
            clearGameIdInLocalStorage()
            dispatch(createGameActionPending());
            GameApi.createGame(data).then((game: Game) => {
                registerGameIdInLocalStorage(game.id)
                dispatch(createGameActionSuccess(game));
                resolve();
            }).catch((error: AxiosError) => dispatch(createGameActionFailed(error.message)));
        });
    };
};

export const joinGameAction = (code: string, userId: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            clearGameIdInLocalStorage()
            dispatch(joinGameActionPending());
            GameApi.joinGame(code, userId).then((game: Game) => {
                registerGameIdInLocalStorage(game.id)
                dispatch(joinGameActionSuccess(game));
                resolve();
            }).catch((error: AxiosError) => dispatch(joinGameActionFailed(error.message)));
        });
    };
};

export const getGameAction = (gameId: string): ThunkAction<Promise<Game>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<Game> => {
        return new Promise<Game>((resolve) => {
            dispatch(getGameActionPending());
            GameApi.getGame(gameId).then((game: Game) => {
                dispatch(getGameActionSuccess(game));
                resolve(game);
            }).catch((error: AxiosError) => dispatch(getGameActionFailed(error.message)));
        });
    };
};
