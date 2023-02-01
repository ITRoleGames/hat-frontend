import {GameAction, GameActionType} from "actions/game.action";
import {Game} from "model/game.model";


interface GameState {
    game?: Game;

    loading: boolean;

    error: string | null;
}

const initialState: GameState = {
    loading: false,
    error: null,
};


const gameReducer = (state: GameState = initialState, action: GameAction): GameState => {
    switch (action.type) {
        case GameActionType.CREATE_GAME_SUCCESS:
        case GameActionType.JOIN_GAME_SUCCESS:
        case GameActionType.GET_GAME_SUCCESS:
        case GameActionType.START_GAME_SUCCESS:
            return {
                loading: false,
                game: action.payload,
                error: null,
            };
        case GameActionType.CREATE_GAME_PENDING:
        case GameActionType.JOIN_GAME_PENDING:
        case GameActionType.GET_GAME_PENDING:
        case GameActionType.START_GAME_PENDING:
            return {
                error: null,
                loading: true
            };
        case GameActionType.CREATE_GAME_FAILED:
        case GameActionType.JOIN_GAME_FAILED:
        case GameActionType.GET_GAME_FAILED:
            return {
                loading: false,
                game: undefined,
                error: action.error,
            };
        case GameActionType.START_GAME_FAILED:
            return {
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
export default gameReducer;
