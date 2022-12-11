import { GameApi } from "api/game.api";
import { CreateGameData } from "model/create-game-data.model";
import { Game } from "model/game.model";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from "redux-thunk";

export enum GameActionType {
    GET_GAME_SUCCESS = "GET_GAME_SUCCESS",
    CREATE_GAME_SUCCESS = "CREATE_GAME_SUCCESS",
}

interface CreateGameActionSuccess {
    type: GameActionType.CREATE_GAME_SUCCESS;

    payload: Game;
}

interface GetGameActionSuccess {
    type: GameActionType.GET_GAME_SUCCESS;

    payload: Game;
}

export type GameAction = CreateGameActionSuccess;

export const createGameActionSuccess = (game: Game): CreateGameActionSuccess => {
    return { type: GameActionType.CREATE_GAME_SUCCESS, payload: game };
};

export const getGameActionSuccess = (game: Game): GetGameActionSuccess => {
    return { type: GameActionType.GET_GAME_SUCCESS, payload: game };
};

export const createGameAction = (data: CreateGameData): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            console.log(`Creating game[${JSON.stringify(data)}]...`);

            GameApi.createGame(data).then((game: Game) => {
                dispatch(createGameActionSuccess(game));
                resolve();
            });
        });
    };
};

export const joinGameAction = (code: string, userId: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            console.log(`Joining game by code ${ code }...`);

            GameApi.joinGame(code, userId).then((game: Game) => {
                dispatch(getGameActionSuccess(game));
                resolve();
            });
        });
    };
};
