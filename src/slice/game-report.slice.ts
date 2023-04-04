import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AxiosError} from "axios";
import {GameApi} from "../api/game.api";
import {GameReport} from "../model/game-report.model";

const initialState: GameReportState = {
    gameReport: undefined,
    loading: false,
    error: null
};

const gameReportSlice = createSlice({
    name: "gameReport",
    initialState,
    reducers: {
        getGameReportActionPending(state: GameReportState) {
            state.loading = true
        },
        getGameReportActionSuccess: (state: GameReportState, action: PayloadAction<GameReport>) => {
            state.loading = false
            state.gameReport = action.payload
            state.error = null
        },
        getGameReportActionFailed: (state: GameReportState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

interface GameReportState {
    gameReport?: GameReport;

    loading: boolean;

    error: string | null;
}

export const getGameReportAction = (gameId: string): ThunkAction<Promise<GameReport>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<GameReport> => {
        return new Promise<GameReport>((resolve) => {
            dispatch(getGameReportActionPending());
            GameApi.getGameReport(gameId).then((gameReport: GameReport) => {
                dispatch(getGameReportActionSuccess(gameReport));
                resolve(gameReport);
            }).catch((error: AxiosError) => dispatch(getGameReportActionFailed(error.message)));
        });
    };
};

export const {
    getGameReportActionPending,
    getGameReportActionSuccess,
    getGameReportActionFailed,

} = gameReportSlice.actions

export default gameReportSlice.reducer;