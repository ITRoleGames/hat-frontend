import {Game} from "../../model/game.model";
import {Player} from "../../model/player.model";
import TeamWarning from "./team-warning";
import TeamPanel from "./team-panel.component";
import {User} from "../../model/user.model";
import {PlayerWithName} from "../../dto/player-with-name";
import {TeamPanelProps} from "../../dto/team-panel-props";
import {logInfo} from "../../utils/logging.utils";
import {Round} from "../../model/round.model";
import {RoundStatus} from "../../model/round-status";

function TeamList({game, currentRound, currentUser, gameUsers, startRound}: Props) {

    const players = game.players;
    const playersWithNames: PlayerWithName[] = players.map((player: Player): PlayerWithName => {
        const gameUser = gameUsers?.find(gu => gu.id == player.userId);
        return {...player, name: gameUser ? gameUser.name : "unknown"}
    });

    const playersGroupedByTeam: Record<string, PlayerWithName[]> =
        groupBy(playersWithNames, (player: PlayerWithName) => {
            return player.teamId
        });

    const getNextMoveOrder = (previousPlayerId: number) =>{
        const previousPlayer = game.players.find(p => p.id == previousPlayerId);
        if(!previousPlayer){
            console.error("Previous player not found")
            return 0;
        }
        const totalPlayers = game.players.length;
        return previousPlayer?.moveOrder == totalPlayers -1 ? 0 : previousPlayer?.moveOrder +1
    }

    const constructTeamPanelProps = (
        game: Game,
        currentUser: User,
        playersGroupedByTeam: Record<string, PlayerWithName[]>,
        teamId: string
    ): TeamPanelProps => {
        const players: PlayerWithName[] = playersGroupedByTeam[teamId]
        const nextPlayer = game.players.find((player: Player) => player.moveOrder == 0);
        const nextTeamId = nextPlayer?.teamId;
        const isTeamPlaying = players[0].teamId == nextTeamId
        const isCurrentUsersTeam = players.findIndex((player) => player.userId == currentUser.id) != -1;

        let currentRoundStartTime;
        if (currentRound && currentRound.status == RoundStatus.STARTED) {
            currentRoundStartTime = currentRound.startTime;
        }

        let nextMoveOrder = 0;

        if(currentRound){
            nextMoveOrder = getNextMoveOrder(currentRound.explainerId)
            console.log(`next move order: ${nextMoveOrder}`)
        }

        return {
            currentUserId: currentUser.id,
            players: players,
            wordsCount: 0,
            isCurrentUsersTeam: isCurrentUsersTeam,
            isTeamPlaying: isTeamPlaying,
            nextMoveOrder: nextMoveOrder,
            roundTime: game.moveTime,
            currentRoundStartTime: currentRoundStartTime
        }
    }

    const handleStartRound = () => {
        // logInfo("call start round from team list")
        startRound(game.id)
    }

    return (
        <>
            {
                Object.keys(playersGroupedByTeam).map(teamId => {
                    const teamProps = constructTeamPanelProps(
                        game,
                        currentUser,
                        playersGroupedByTeam,
                        teamId
                    )
                    return (
                        <div key={teamId}>
                            <TeamWarning game={game} {...teamProps}/>
                            <TeamPanel {...teamProps} startRound={handleStartRound}/>
                        </div>
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
    currentRound: Round | undefined,
    currentUser: User,
    gameUsers: User[],
    startRound: (gameId: string) => any
};


export default TeamList;