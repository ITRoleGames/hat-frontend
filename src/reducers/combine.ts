import gameReducer from "reducers/game.reducer";
import userReducer from "reducers/user.reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
