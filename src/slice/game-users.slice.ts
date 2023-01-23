import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../model/user.model";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {UserApi} from "../api/user.api";
import {AxiosError} from "axios";
import {GetUsersResponse} from "../dto/get-users-response";

const initialState: GameUsersState = {
    users: [],
    loading: false,
    error: null
};

const gameUsersSlice = createSlice({
    name: "gameUsers",
    initialState,
    reducers: {
        getGameUsersActionPending(state: GameUsersState) {
            state.loading = true
        },
        getGameUsersActionSuccess: (state: GameUsersState, action: PayloadAction<User[]>) => {
            state.loading = false
            state.users = mergeUsers(state.users, action.payload)
        },
        getGameUsersActionFailed: (state: GameUsersState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        clearGameUsersAction: (state: GameUsersState) => {
            state.users = []
        },
    }
})

const mergeUsers = (firstUserList: User[], secondUserList: User[]): User[] => {

    const firstUserListIds = firstUserList.map(u => u.id);
    return [...firstUserList, ...secondUserList.filter((user) => firstUserListIds.indexOf(user.id) < 0)]
}

interface GameUsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const getGameUsersAction = (ids: string[]): ThunkAction<Promise<User[]>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<User[]> => {
        return new Promise<User[]>((resolve) => {
            dispatch(getGameUsersActionPending());

            return UserApi.getUsers(ids).then((resp: GetUsersResponse) => {
                dispatch(getGameUsersActionSuccess(resp.users));
                resolve(resp.users);
            }).catch((error: AxiosError) => dispatch(getGameUsersActionFailed(error.message)));
        });
    };
};

export const {
    getGameUsersActionPending,
    getGameUsersActionSuccess,
    getGameUsersActionFailed,
    clearGameUsersAction
} = gameUsersSlice.actions

export default gameUsersSlice.reducer;