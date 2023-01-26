import gameReducer from "reducers/game.reducer";
import userReducer from "reducers/user.reducer";
import { combineReducers } from "redux";
import eventReducer from "./event.reducer";
import gameUsersSlice from "../slice/game-users.slice";

const reducers = combineReducers({
    user: userReducer,
    game: gameReducer,
    gameUsers: gameUsersSlice,
    eventState: eventReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
