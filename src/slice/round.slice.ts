import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Round} from "../model/round.model";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {RoundApi} from "../api/round.api";
import {AxiosError} from "axios";
import {logInfo} from "../utils/logging.utils";
import {RoundStatus} from "../model/round-status";
import {Explanation} from "../model/explanation.model";
import {ExplanationApi} from "../api/explanation.api";
import {UpdateExplanationData} from "../model/update-explanation-data.mode";
// import {finishGame} from "./game.slice";

const initialState: RoundState = {
    round: undefined,
    loading: false,
    error: null
};

const roundSlice = createSlice({
    name: "round",
    initialState,
    reducers: {
        getLatestRoundActionPending(state: RoundState) {
            state.loading = true
            state.error = null
        },
        getLatestRoundActionSuccess: (state: RoundState, action: PayloadAction<Round | undefined>) => {
            state.loading = false
            state.round = action.payload;
            state.error = null
        },
        getLatestRoundActionFailed: (state: RoundState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        startRoundActionPending(state: RoundState) {
            state.loading = true
            state.error = null
        },
        startRoundActionSuccess(state: RoundState, action: PayloadAction<Round>) {
            state.loading = false
            state.round = action.payload;
            state.error = null
        },
        startRoundActionFailed(state: RoundState, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        finishRoundActionPending(state: RoundState) {
            state.loading = true
            state.error = null
        },
        finishRoundActionSuccess(state: RoundState) {
            state.loading = false
            state.round ? state.round.status = RoundStatus.FINISHED : undefined
            state.error = null
        },
        finishRoundActionFailed(state: RoundState, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        nextExplanationActionPending(state: RoundState) {
            state.loading = true
            state.error = null
        },
        nextExplanationActionSuccess(state: RoundState, action: PayloadAction<Explanation>) {
            state.loading = false
            state.round ? state.round.explanation = action.payload : undefined
            state.error = null
        },
        nextExplanationActionFailed(state: RoundState, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
    }
})

interface RoundState {
    round: Round | undefined;
    loading: boolean;
    error: string | null;
}

export const startRoundAction = (gameId: string): ThunkAction<Promise<Round>, {}, {}, AnyAction> => {
    logInfo("call startRoundAction")
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<Round> => {
        return new Promise<Round>((resolve) => {
            dispatch(startRoundActionPending());

            return RoundApi.startRound(gameId).then((resp: Round) => {
                dispatch(startRoundActionSuccess(resp));
                resolve(resp);
            }).catch((error: AxiosError) => dispatch(startRoundActionFailed(error.message)));
        });
    };
};

export const getCurrentRoundAction = (gameId: string): ThunkAction<Promise<Round | undefined>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<Round| undefined> => {
        return new Promise<Round | undefined>((resolve) => {
            dispatch(getLatestRoundActionPending());

            return RoundApi.getLatestRound(gameId).then((resp: Round | undefined) => {
                if(resp) {
                    dispatch(getLatestRoundActionSuccess(resp));
                }else {
                    dispatch(getLatestRoundActionFailed("not found"));
                }
                resolve(resp);
            }).catch((error: AxiosError) => dispatch(getLatestRoundActionFailed(error.message)));
        });
    };
};

export const nextExplanationAction = (
    gameId: string,
    roundId: number,
    updateExplanationData: UpdateExplanationData
): ThunkAction<Promise<Explanation | null>, {}, {}, AnyAction> => {
    logInfo("call nextExplanationAction")//todo: remove
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<Explanation | null> => {
        return new Promise<Explanation | null>((resolve) => {
            dispatch(nextExplanationActionPending());
            return ExplanationApi.getNextExplanation(gameId, roundId, updateExplanationData).then((resp: Explanation | null) => {
                if(resp == null){
                    dispatch(finishRoundAction(gameId,roundId))
                    resolve(null)
                }else {
                    dispatch(nextExplanationActionSuccess(resp));
                    resolve(resp);
                }
            }).catch((error: AxiosError) => dispatch(nextExplanationActionFailed(error.message)));
        });
    };
};

export const finishRoundAction = (gameId: string, roundId: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(finishRoundActionPending());

            return RoundApi.finishRound(gameId, roundId).then(() => {
                dispatch(finishRoundActionSuccess());
                resolve();
            }).catch((error: AxiosError) => dispatch(finishRoundActionFailed(error.message)));
        });
    };
};

export const {
    getLatestRoundActionPending,
    getLatestRoundActionSuccess,
    getLatestRoundActionFailed,
    startRoundActionPending,
    startRoundActionSuccess,
    startRoundActionFailed,
    nextExplanationActionPending,
    nextExplanationActionSuccess,
    nextExplanationActionFailed,
    finishRoundActionPending,
    finishRoundActionSuccess,
    finishRoundActionFailed
} = roundSlice.actions

export default roundSlice.reducer;
