import {Player} from "../model/player.model";
import {PlayerWithName} from "../dto/player-with-name";
import {User} from "../model/user.model";

export const enrichPlayersWithNames = (players: Player[], gameUsers: User[]) => {
    return players.map((player: Player): PlayerWithName => {
        const gameUser = gameUsers?.find(gu => gu.id == player.userId);
        return {...player, name: gameUser ? gameUser.name : "unknown"}
    });
}