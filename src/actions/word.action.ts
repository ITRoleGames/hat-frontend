import {WordApi} from "api/word.api";
import {AxiosError} from "axios";
import {AddWordsData} from "model/add-words-data.model"
import {AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export enum WordsActionType {
    ADD_WORDS_SUCCESS = "ADD_WORDS_SUCCESS",
    ADD_WORDS_PENDING = "ADD_WORDS_PENDING",
    ADD_WORDS_FAILED = "ADD_WORDS_FAILED"
}

interface AddWordsActionSuccess {
    type: WordsActionType.ADD_WORDS_SUCCESS;
}

interface AddWordsActionPending {
    type: WordsActionType.ADD_WORDS_PENDING;
}

interface AddWordsActionFailed {
    type: WordsActionType.ADD_WORDS_FAILED;
    error: string;
}

export type WordsAction =
    AddWordsActionSuccess
    | AddWordsActionPending
    | AddWordsActionFailed


export const addWordsActionSuccess = (): AddWordsActionSuccess => {
    return {type: WordsActionType.ADD_WORDS_SUCCESS};
};

export const addWordsActionPending = (): AddWordsActionPending => {
    return {type: WordsActionType.ADD_WORDS_PENDING};
};

export const addWordsActionFailed = (error: string): AddWordsActionFailed => {
    return {type: WordsActionType.ADD_WORDS_FAILED, error: error};
};


export const addWordsAction = (data: AddWordsData): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(addWordsActionPending());
            WordApi.addWords(data).then(() => {
                    dispatch(addWordsActionSuccess());
                    resolve();
                }
            ).catch((error: AxiosError) => dispatch(addWordsActionFailed(error.message)));
        });
    };
};
