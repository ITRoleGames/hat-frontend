import {Game} from "../../model/game.model";
import {Player} from "../../model/player.model";
import TeamWarning from "./team-warning";
import TeamPanel from "./team-panel.component";
import {User} from "../../model/user.model";
import {PlayerWithName} from "../../dto/player-with-name";
import {TeamPanelProps} from "../../dto/team-panel-props";
import {Round} from "../../model/round.model";
import {RoundStatus} from "../../model/round-status";
import {GameReport} from "../../model/game-report.model";
import {PlayerRef} from "../../model/player-ref.model";
import {TeamStatistics} from "../../model/team-statistics.model";
import {groupBy} from "../../service/group.utils";
import {enrichPlayersWithNames} from "../../service/player.utils";

function TeamList({game, currentRound, currentUser, gameUsers, gameReport, startRound}: Props) {

    const players = game.players;
    const playersWithNames: PlayerWithName[] = enrichPlayersWithNames(players, gameUsers);

    const playersGroupedByTeam: Record<string, PlayerWithName[]> =
        groupBy(playersWithNames, (player: PlayerWithName) => {
            return player.teamId
        });

    const getNextMoveOrder = (previousPlayerId: number) => {
        const previousPlayer = game.players.find(p => p.id == previousPlayerId);
        if (!previousPlayer) {
            console.error("Previous player not found")
            return 0;
        }
        const totalPlayers = game.players.length;
        return previousPlayer?.moveOrder == totalPlayers - 1 ? 0 : previousPlayer?.moveOrder + 1
    }

    const constructTeamPanelProps = (
        game: Game,
        gameReport: GameReport | undefined,
        currentUser: User,
        playersGroupedByTeam: Record<string, PlayerWithName[]>,
        teamId: string
    ): TeamPanelProps => {

        let nextMoveOrder = 0;
        if (currentRound) {
            nextMoveOrder = getNextMoveOrder(currentRound.explainerId)
        }

        const players: PlayerWithName[] = playersGroupedByTeam[teamId]
        const nextPlayer = game.players.find((player: Player) => player.moveOrder == nextMoveOrder);
        const nextTeamId = nextPlayer?.teamId;
        const isTeamPlaying = players[0].teamId == nextTeamId
        const isCurrentUsersTeam = players.findIndex((player) => player.userId == currentUser.id) != -1;

        let currentRoundStartTime = undefined;
        if (currentRound && currentRound.status == RoundStatus.STARTED) {
            currentRoundStartTime = currentRound.startTime;
        }

        const teamStats = gameReport?.teamStats?.find((ts: TeamStatistics) =>
            ts.players.findIndex((playerRef: PlayerRef) => playerRef.internalId == players[0].id) != -1
        );

        return {
            currentUserId: currentUser.id,
            players: players,
            wordsCount: teamStats ? teamStats.wordsGuessed : 0,
            isCurrentUsersTeam: isCurrentUsersTeam,
            isTeamPlayingNext: isTeamPlaying,
            nextMoveOrder: nextMoveOrder,
            roundTime: game.moveTime, //todo: возможно не надо
            currentRoundStartTime: currentRoundStartTime,
            currentRoundStatus: currentRound?.status
        }
    }

    const handleStartRound = () => {
        startRound(game.id)
    }

    return (
        <>
            {
                Object.keys(playersGroupedByTeam).map(teamId => {
                    const teamProps = constructTeamPanelProps(
                        game,
                        gameReport,
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



type Props = {
    game: Game,
    currentRound: Round | undefined,
    currentUser: User,
    gameUsers: User[],
    gameReport: GameReport | undefined,
    startRound: (gameId: string) => any
};


export default TeamList;