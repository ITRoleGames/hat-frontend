import {TeamStatistics} from "./team-statistics.model";

export interface GameReport {
    wordsGuessed: number;

    /**
     * Длительность игры в секундах
     */
    totalTime: number;

    teamStats: TeamStatistics[];
}