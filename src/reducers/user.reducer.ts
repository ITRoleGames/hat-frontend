import { User } from "model/user.model";
import { UserActionType } from "../actions/user.action";
import { UserAction } from "../actions/user.action";


interface UserState {
    user: User | null;

    loading: boolean;

    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};


const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionType.CREATE_USER_PENDING:
            return {
                loading: true,
                user: null,
                error: null,
            };
        case UserActionType.CREATE_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
            };
        case UserActionType.CREATE_USER_FAIL:
            return {
                loading: false,
                user: null,
                error: action.payload,
            };
        case UserActionType.GET_CURRENT_USER_PENDING:
            return {
                loading: true,
                user: null,
                error: null,
            };
        case UserActionType.GET_CURRENT_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
            };
        default:
            return state;
    }
};
export default userReducer;
