import {TeamStatistics} from "./team-statistics.model";

export interface GameReport {
    wordsGuessed: number;
    totalTime: number;
    teamStats: TeamStatistics[];
}