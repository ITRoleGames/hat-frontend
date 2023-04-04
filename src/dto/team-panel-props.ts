import {PlayerWithName} from "./player-with-name";
import {RoundStatus} from "../model/round-status";

export interface TeamPanelProps {
    currentUserId: string,
    players: PlayerWithName[],
    wordsCount: number,
    isCurrentUsersTeam: boolean,
    isTeamPlayingNext: boolean,
    nextMoveOrder: number,
    roundTime: number,
    currentRoundStartTime: string | undefined,
    currentRoundStatus: RoundStatus | undefined
}