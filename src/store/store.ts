import { configureStore } from "@reduxjs/toolkit";
import reducers from "reducers/combine";
import thunk from "redux-thunk";
// // @ts-ignore
// import untypedMiddleware from "untyped-middleware";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk,
            ),
});
