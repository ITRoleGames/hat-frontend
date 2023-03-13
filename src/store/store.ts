import {configureStore} from "@reduxjs/toolkit";
import reducers from "reducers/combine";
import thunk from "redux-thunk";
import webSocketMiddleware from "../service/web-socket-middleware";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(
            thunk,
        ).concat(webSocketMiddleware)
});


export type RootState = ReturnType<typeof store.getState>