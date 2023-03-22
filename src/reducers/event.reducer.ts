import {EventAction, EventActionType} from "../actions/event.actions";


interface EventState {
    connecting: boolean;
    connected: boolean;
}

const initialState: EventState = {
    connecting: false,
    connected: false,
};

const eventReducer = (state: EventState = initialState, action: EventAction): EventState => {
    switch (action.type) {
        case EventActionType.CONNECTING:
            return {
                ...state,
                connecting: true,
            };
        case EventActionType.CONNECTED:
            return {
                ...state,
                connected: true,
                connecting: false
            };
        default:
            return state;
    }
};
export default eventReducer;