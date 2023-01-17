import {GameAction, GameActionType} from "actions/game.action";
import {Game} from "model/game.model";


interface GameState {
    game: Game | null;

    loading: boolean;

    error: string | null;
}

const initialState: GameState = {
    game: null,
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
                ...state,
                loading: true
            };
        case GameActionType.CREATE_GAME_FAILED:
            return {
                loading: false,
                game: null,
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
                game: null,
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
                ...state,
                loading: true
            };
        case GameActionType.JOIN_GAME_FAILED:
            return {
                loading: false,
                game: null,
                error: action.error,
            };
        default:
            return state;
    }
};
export default gameReducer;
