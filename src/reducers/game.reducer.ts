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
            return {
                loading: false,
                game: action.payload,
                error: null,
            };
        case GameActionType.CREATE_GAME_PENDING:
            return {
                error: null,
                game: undefined,
                loading: true
            };
        case GameActionType.CREATE_GAME_FAILED:
            return {
                loading: false,
                game: undefined,
                error: action.error,
            };
        case GameActionType.GET_GAME_SUCCESS:
            return {
                loading: false,
                game: action.payload,
                error: null,
            };
        case GameActionType.GET_GAME_PENDING:
            return {
                ...state,
                loading: true
            };
        case GameActionType.GET_GAME_FAILED:
            return {
                loading: false,
                game: undefined,
                error: action.error,
            };
        case GameActionType.JOIN_GAME_SUCCESS:
            return {
                loading: false,
                game: action.payload,
                error: null,
            };
        case GameActionType.JOIN_GAME_PENDING:
            return {
                error: null,
                loading: true
            };
        case GameActionType.JOIN_GAME_FAILED:
            return {
                loading: false,
                game: undefined,
                error: action.error,
            };
        default:
            return state;
    }
};
export default gameReducer;
