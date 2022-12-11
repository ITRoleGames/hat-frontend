// import createHistory from "history/createBrowserHistory";
import { configureStore } from "@reduxjs/toolkit";
// import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import reducers from "reducers/combine";
import thunk from "redux-thunk";
// @ts-ignore
import untypedMiddleware from "untyped-middleware";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk,
            ),
});

// export const store = createStore<RootState, any, any, any>(reducers, {}, enhancer);
