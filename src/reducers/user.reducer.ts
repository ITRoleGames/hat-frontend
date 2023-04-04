import { User } from "model/user.model";
import { UserActionType } from "actions/user.action";
import { UserAction } from "actions/user.action";


interface UserState {
    user?: User;

    loading: boolean;

    error: string | null;
}

const initialState: UserState = {
    user: undefined,
    loading: false,
    error: null,
};


const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionType.CREATE_USER_PENDING:
            return {
                loading: true,
                user: undefined,
                error: null,
            };
        case UserActionType.CREATE_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
            };
        case UserActionType.CREATE_USER_FAILED:
            return {
                loading: false,
                user: undefined,
                error: action.payload,
            };
        case UserActionType.GET_CURRENT_USER_PENDING:
            return {
                loading: true,
                user: undefined,
                error: null,
            };
        case UserActionType.GET_CURRENT_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
            };
        case UserActionType.GET_CURRENT_USER_FAILED:
            return {
                loading: false,
                user: undefined,
                error: action.error,
            };
        default:
            return state;
    }
};
export default userReducer;
