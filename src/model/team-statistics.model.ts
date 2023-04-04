import {PlayerRef} from "./player-ref.model";

export interface TeamStatistics {
    players: PlayerRef[];
    wordsGuessed: number;
    roundsCount: number;
}