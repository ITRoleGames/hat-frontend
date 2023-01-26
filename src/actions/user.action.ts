import { UserApi } from "api/user.api";
import { AxiosError } from "axios";
import { User } from "model/user.model";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from "redux-thunk";
import { registerAccessToken } from "service/local-storage";
import {clearGameUsersAction, getGameUsersActionSuccess} from "../slice/game-users.slice";

export enum UserActionType {
    GET_CURRENT_USER_PENDING = "GET_CURRENT_USER_PENDING",
    GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
    GET_CURRENT_USER_FAILED = "GET_CURRENT_USER_FAILED",
    CREATE_USER_PENDING = "CREATE_USER_PENDING",
    CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
    CREATE_USER_FAILED = "CREATE_USER_FAILED",
}

interface CreateUserActionPending {
    type: UserActionType.CREATE_USER_PENDING;
}

interface CreateUserActionSuccess {
    type: UserActionType.CREATE_USER_SUCCESS;

    payload: User;
}

interface CreateUserActionFailed {
    type: UserActionType.CREATE_USER_FAILED;

    payload: string;
}

interface GetCurrentUserActionPending {
    type: UserActionType.GET_CURRENT_USER_PENDING;
}

interface GetCurrentUserActionSuccess {
    type: UserActionType.GET_CURRENT_USER_SUCCESS;

    payload: User;
}

interface GetCurrentUserActionFailed {
    type: UserActionType.GET_CURRENT_USER_FAILED;

    error: string;
}

export type UserAction =
    CreateUserActionPending
    | CreateUserActionSuccess
    | CreateUserActionFailed
    | GetCurrentUserActionPending
    | GetCurrentUserActionSuccess
    | GetCurrentUserActionFailed;

export const createUserActionPending = (): CreateUserActionPending => {
    return { type: UserActionType.CREATE_USER_PENDING };
};

export const createUserActionSuccess = (user: User): CreateUserActionSuccess => {
    return { type: UserActionType.CREATE_USER_SUCCESS, payload: user };
};

export const createUserActionFailed = (error: string): CreateUserActionFailed => {
    return { type: UserActionType.CREATE_USER_FAILED, payload: error };
};

export const getCurrentUserActionPending = (): GetCurrentUserActionPending => {
    return { type: UserActionType.GET_CURRENT_USER_PENDING };
};

export const getCurrentUserActionSuccess = (user: User): GetCurrentUserActionSuccess => {
    return { type: UserActionType.GET_CURRENT_USER_SUCCESS, payload: user };
};

export const getCurrentUserActionFailed = (error: string): GetCurrentUserActionFailed => {
    return { type: UserActionType.GET_CURRENT_USER_FAILED, error: error };
};

export const createUserAction = (): ThunkAction<Promise<User>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<User> => {
        return new Promise<User>((resolve) => {
            dispatch(createUserActionPending());

            return UserApi.createUser().then((user: User) => {
                dispatch(createUserActionSuccess(user));
                dispatch(clearGameUsersAction())
                dispatch(getGameUsersActionSuccess([user]));
                registerAccessToken(user.accessToken);
                resolve(user);
            }).catch((error: AxiosError) => dispatch(createUserActionFailed(error.message)));
        });
    };
};

export const getCurrentUserAction = (): ThunkAction<Promise<User>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<User> => {
        return new Promise<User>((resolve) => {
            dispatch(getCurrentUserActionPending());

            return UserApi.getCurrentUser().then((user: User) => {
                dispatch(getCurrentUserActionSuccess(user));
                resolve(user);
            }).catch((error: AxiosError) => dispatch(getCurrentUserActionFailed(error.message)));
        });
    };
};
