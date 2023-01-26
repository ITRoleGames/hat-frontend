import {PlayerStatus} from "./player-status";
import {PlayerRole} from "./player-role";

export interface Player {
    id: string,
    userId: string
    status: PlayerStatus,
    order: number,
    teamId: string,
    role: PlayerRole

}