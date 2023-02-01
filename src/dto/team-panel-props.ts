import {PlayerWithName} from "./player-with-name";

export interface TeamPanelProps {
    currentUserId: string,
    players: PlayerWithName[],
    wordsCount: number,
    isCurrentUsersTeam: boolean,
    isTeamPlaying: boolean,
    roundTime: number
}