import {PlayerStatus} from "../model/player-status";

export interface PlayerWithName {
    id: string,
    status: PlayerStatus,
    name: string
}