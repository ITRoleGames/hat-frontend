export enum EventActionType {
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
}

interface ConnectingAction {
    type: EventActionType.CONNECTING;
}

interface ConnectedAction {
    type: EventActionType.CONNECTED;
}

export type EventAction = ConnectingAction | ConnectedAction

export const connectingAction = (): ConnectingAction => {
    return {type: EventActionType.CONNECTING};
};

export const connectedAction = (): ConnectedAction => {
    return {type: EventActionType.CONNECTED};
};