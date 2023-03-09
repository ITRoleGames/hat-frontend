import {PlayerStatus} from "./player-status";
import {PlayerRole} from "./player-role";

export interface Player {
    id: string,
    userId: string
    status: PlayerStatus,
    moveOrder: number,
    teamId: number,
    role: PlayerRole

}