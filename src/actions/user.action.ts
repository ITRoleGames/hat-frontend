import { UserApi } from "api/user.api";
import { User } from "model/user.model";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from "redux-thunk";
import { registerAccessToken } from "service/local-storage";

export enum UserActionType {
    GET_CURRENT_USER_PENDING = "GET_CURRENT_USER_PENDING",
    GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS",
    CREATE_USER_PENDING = "CREATE_USER_PENDING",
    CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS",
    CREATE_USER_FAIL = "CREATE_USER_FAIL",
}

interface CreateUserActionPending {
    type: UserActionType.CREATE_USER_PENDING;
}

interface CreateUserActionSuccess {
    type: UserActionType.CREATE_USER_SUCCESS;

    payload: User;
}

interface CreateUserActionFail {
    type: UserActionType.CREATE_USER_FAIL;

    payload: string;
}

interface GetCurrentUserActionPending {
    type: UserActionType.GET_CURRENT_USER_PENDING;
}

interface GetCurrentUserActionSuccess {
    type: UserActionType.GET_CURRENT_USER_SUCCESS;

    payload: User;
}

export type UserAction =
    CreateUserActionPending
    | CreateUserActionSuccess
    | CreateUserActionFail
    | GetCurrentUserActionPending
    | GetCurrentUserActionSuccess;

export const createUserActionPending = (): CreateUserActionPending => {
    return { type: UserActionType.CREATE_USER_PENDING };
};

export const createUserActionSuccess = (user: User): CreateUserActionSuccess => {
    return { type: UserActionType.CREATE_USER_SUCCESS, payload: user };
};

export const createUserActionFail = (error: string): CreateUserActionFail => {
    return { type: UserActionType.CREATE_USER_FAIL, payload: error };
};

export const getCurrentUserActionPending = (): GetCurrentUserActionPending => {
    return { type: UserActionType.GET_CURRENT_USER_PENDING };
};

export const getCurrentUserActionSuccess = (user: User): GetCurrentUserActionSuccess => {
    return { type: UserActionType.GET_CURRENT_USER_SUCCESS, payload: user };
};

export const createUserAction = (): ThunkAction<Promise<User>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<User> => {
        return new Promise<User>((resolve) => {
            dispatch(createUserActionPending());
            console.log("Creating user...");

            return UserApi.createUser().then((user: User) => {
                console.log(`User created ${ JSON.stringify(user) }`);
                dispatch(createUserActionSuccess(user));
                registerAccessToken(user.accessToken);
                resolve(user);
            });
        });
    };
};

export const getCurrentUserAction = (): ThunkAction<Promise<User>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<User> => {
        return new Promise<User>((resolve) => {
            console.log("Getting current user...");
            dispatch(getCurrentUserActionPending())

            return UserApi.getCurrentUser().then((user: User) => {
                console.log(`Current user received ${ JSON.stringify(user) }`);
                dispatch(getCurrentUserActionSuccess(user));
                resolve(user);
            });
        });
    };
};
