import {TeamStatistics} from "./team-statistics.model";
import {GameStatus} from "./game-status";

export interface GameReport {

    /**
     * Статус игры
     * Сейчас это костыль, чтобы фронт понял что игра закончилась. Хотелось бы заменить это на
     * WS событие окончания игры
     */
    gameStatus: GameStatus;

    wordsGuessed: number;

    /**
     * Длительность игры в секундах
     */
    totalTime: number;

    teamStats: TeamStatistics[];
}
