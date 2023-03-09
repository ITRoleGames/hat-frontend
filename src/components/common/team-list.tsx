import {Game} from "../../model/game.model";
import {Player} from "../../model/player.model";
import TeamWarning from "./team-warning";
import TeamPanel from "./team-panel.component";
import {User} from "../../model/user.model";
import {PlayerWithName} from "../../dto/player-with-name";
import {TeamPanelProps} from "../../dto/team-panel-props";

function TeamList({game, currentUser, gameUsers}: Props) {

    const players = game.players;

    const playersWithNames: PlayerWithName[] = players.map((player: Player): PlayerWithName => {
        const gameUser = gameUsers?.find(gu => gu.id == player.userId);
        return {...player, name: gameUser ? gameUser.name : "unknown"}
    });

    const playersGroupedByTeam: Record<string, PlayerWithName[]> =
        groupBy(playersWithNames, (player: PlayerWithName) => {
            return player.teamId
        });

    const constructTeamPanelProps = (
        game: Game,
        currentUser: User,
        playersGroupedByTeam: Record<string, PlayerWithName[]>,
        teamId: string
    ): TeamPanelProps => {
        const players: PlayerWithName[] = playersGroupedByTeam[teamId]
        const nextPlayerId = game.players.find((player: Player) => player.moveOrder == 0)?.id
        const isCurrentUser = players.findIndex((player) => player.userId == currentUser.id) != -1
        const isCurrentUserTurn = players.findIndex((player: Player) => player.id == nextPlayerId) != -1

        return {
            currentUserId: currentUser.id,
            players: players,
            wordsCount: 0,
            isCurrentUsersTeam: isCurrentUser,
            isTeamPlaying: isCurrentUserTurn,
            roundTime: 30
        }
    }

    return (
        <>
            {
                Object.keys(playersGroupedByTeam).map(key => {
                    const teamProps = constructTeamPanelProps(
                        game,
                        currentUser,
                        playersGroupedByTeam,
                        key
                    )
                    return (
                        <>
                            <TeamWarning game={game} {...teamProps}/>
                            <TeamPanel {...teamProps}/>
                        </>
                    )
                })
            }
        </>
    )
}

function groupBy<T>(arr: T[], fn: (item: T) => any): Record<string, T[]> {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return {...prev, [groupKey]: group};
    }, {});
}

type Props = {
    game: Game,
    currentUser: User,
    gameUsers: User[]
};


export default TeamList;