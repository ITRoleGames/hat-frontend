import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AxiosError} from "axios";
import {Game} from "../model/game.model";
import {GameApi} from "../api/game.api";
import {CreateGameData} from "../model/create-game-data.model";
import {clearGameIdInLocalStorage, registerGameIdInLocalStorage} from "../service/local-storage";
import {connectAction} from "../actions/event.actions";

const initialState: GameState = {
    game: undefined,
    loading: false,
    error: null
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        getGameActionPending(state: GameState) {
            state.loading = true
        },
        getGameActionSuccess: (state: GameState, action: PayloadAction<Game>) => {
            state.loading = false
            state.game = action.payload
            state.error = null
        },
        getGameActionFailed: (state: GameState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        createGameActionPending: (state: GameState) => {
            state.loading = true;
        },
        createGameActionSuccess: (state: GameState, action: PayloadAction<Game>) => {
            state.loading = false
            state.game = action.payload
            state.error = null
        },
        createGameActionFailed: (state: GameState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        joinGameActionPending: (state: GameState) => {
            state.loading = true;
        },
        joinGameActionSuccess: (state: GameState, action: PayloadAction<Game>) => {
            state.loading = false
            state.game = action.payload
            state.error = null
        },
        joinGameActionFailed: (state: GameState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        startGameActionPending: (state: GameState) => {
            state.loading = true;
        },
        startGameActionSuccess: (state: GameState, action: PayloadAction<Game>) => {
            state.loading = false
            state.game = action.payload
            state.error = null
        },
        startGameActionFailed: (state: GameState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

interface GameState {
    game?: Game;

    loading: boolean;

    error: string | null;
}

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


export const createGameAction = (data: CreateGameData): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            clearGameIdInLocalStorage()
            dispatch(createGameActionPending());
            GameApi.createGame(data).then((game: Game) => {
                registerGameIdInLocalStorage(game.id)
                dispatch(createGameActionSuccess(game));
                dispatch(connectAction());
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
                dispatch(connectAction());
                resolve();
            }).catch((error: AxiosError) => dispatch(joinGameActionFailed(error.message)));
        });
    };
};

export const startGameAction = (gameId: string): ThunkAction<Promise<Game>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<Game> => {
        return new Promise<Game>((resolve) => {
            dispatch(startGameActionPending());
            GameApi.startGame(gameId).then((game: Game) => {
                dispatch(startGameActionSuccess(game));
                resolve(game);
            }).catch((error: AxiosError) => dispatch(startGameActionFailed(error.message)));
        });
    };
};

export const {
    getGameActionPending,
    getGameActionSuccess,
    getGameActionFailed,
    createGameActionPending,
    createGameActionSuccess,
    createGameActionFailed,
    joinGameActionPending,
    joinGameActionSuccess,
    joinGameActionFailed,
    startGameActionPending,
    startGameActionSuccess,
    startGameActionFailed

} = gameSlice.actions

export default gameSlice.reducer;