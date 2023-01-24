import {Player} from "../model/player.model";

export interface PlayerWithName extends Player {
    name: string
}