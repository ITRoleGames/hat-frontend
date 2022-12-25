import { GameApi } from "api/game.api";
import { AxiosError } from "axios";
import { CreateGameData } from "model/create-game-data.model";
import { Game } from "model/game.model";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from "redux-thunk";

export enum GameActionType {
    GET_GAME_SUCCESS = "GET_GAME_SUCCESS",
    GET_GAME_PENDING = "GET_GAME_PENDING",
    GET_GAME_FAILED = "GET_GAME_FAILED",
    CREATE_GAME_SUCCESS = "CREATE_GAME_SUCCESS",
    CREATE_GAME_PENDING = "CREATE_GAME_PENDING",
    CREATE_GAME_FAILED = "CREATE_GAME_FAILED",
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
    | GetGameActionPending
    | GetGameActionSuccess
    | GetGameActionFailed;

export const createGameActionSuccess = (game: Game): CreateGameActionSuccess => {
    return { type: GameActionType.CREATE_GAME_SUCCESS, payload: game };
};

export const createGameActionPending = (): CreateGameActionPending => {
    return { type: GameActionType.CREATE_GAME_PENDING };
};

export const createGameActionFailed = (error: string): CreateGameActionFailed => {
    return { type: GameActionType.CREATE_GAME_FAILED, error: error };
};

export const getGameActionSuccess = (game: Game): GetGameActionSuccess => {
    return { type: GameActionType.GET_GAME_SUCCESS, payload: game };
};

export const getGameActionPending = (): GetGameActionPending => {
    return { type: GameActionType.GET_GAME_PENDING };
};

export const getGameActionFailed = (error: string): GetGameActionFailed => {
    return { type: GameActionType.GET_GAME_FAILED, error: error };
};


export const createGameAction = (data: CreateGameData): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(createGameActionPending());
            GameApi.createGame(data).then((game: Game) => {
                dispatch(createGameActionSuccess(game));
                resolve();
            }).catch((error: AxiosError) => dispatch(createGameActionFailed(error.message)));
        });
    };
};

export const joinGameAction = (code: string, userId: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(getGameActionPending());
            GameApi.joinGame(code, userId).then((game: Game) => {
                dispatch(getGameActionSuccess(game));
                resolve();
            }).catch((error: AxiosError) => dispatch(getGameActionFailed(error.message)));
        });
    };
};
