export enum EventActionType {
    CONNECT = "CONNECT",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
}

interface ConnectAction {
    type: EventActionType.CONNECT;
}

interface ConnectingAction {
    type: EventActionType.CONNECTING;
}

interface ConnectedAction {
    type: EventActionType.CONNECTED;
}

export type EventAction = ConnectAction | ConnectingAction | ConnectedAction

export const connectAction = (): ConnectAction => {
    return {type: EventActionType.CONNECT};
};

export const connectingAction = (): ConnectingAction => {
    return {type: EventActionType.CONNECTING};
};

export const connectedAction = (): ConnectedAction => {
    return {type: EventActionType.CONNECTED};
};