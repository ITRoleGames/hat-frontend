import {PlayerWithName} from "./player-with-name";

export interface TeamResultsPanelProps {
    teamId: string,
    currentUserId: string,
    players: PlayerWithName[],
    wordsCount: number,
    isCurrentUsersTeam: boolean,
    guessedWords: number,
    roundsPerTeam: number,
    place: number
}