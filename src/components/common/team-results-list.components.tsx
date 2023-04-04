import {Game} from "../../model/game.model";
import {User} from "../../model/user.model";
import {PlayerWithName} from "../../dto/player-with-name";
import {GameReport} from "../../model/game-report.model";
import {PlayerRef} from "../../model/player-ref.model";
import {TeamStatistics} from "../../model/team-statistics.model";
import {groupBy} from "../../service/group.utils";
import {enrichPlayersWithNames} from "../../service/player.utils";
import TeamResultsPanel from "./team-results-panel.component";
import {TeamResultsPanelProps} from "../../dto/team-results-panel-props";

function TeamResultsList({game, currentUser, gameUsers, gameReport}: Props) {

    const {players} = game;
    const playersWithNames: PlayerWithName[] = enrichPlayersWithNames(players, gameUsers);

    const playersGroupedByTeam: Record<string, PlayerWithName[]> =
        groupBy(playersWithNames, (player: PlayerWithName) => {
            return player.teamId
        });


    const constructTeamPanelProps = (
        game: Game,
        gameReport: GameReport,
        currentUser: User,
        playersGroupedByTeam: Record<string, PlayerWithName[]>,
        teamId: string
    ): TeamResultsPanelProps => {

        const players: PlayerWithName[] = playersGroupedByTeam[teamId]
        const isCurrentUsersTeam = players.findIndex((player) => player.userId == currentUser.id) != -1;

        const teamStats = gameReport.teamStats.find((ts: TeamStatistics) =>
            ts.players.findIndex((playerRef: PlayerRef) => playerRef.internalId == players[0].id) != -1
        );

        const sortedGuessedWords = gameReport.teamStats?.map(ts => ts.wordsGuessed).sort().reverse();
        let wordsGuessed = 0;
        let roundsCount = 0;
        let place = 0;
        if (teamStats) {
            wordsGuessed = teamStats.wordsGuessed;
            roundsCount = teamStats.roundsCount;
            place = sortedGuessedWords?.indexOf(teamStats.wordsGuessed) + 1
        }

        return {
            teamId: teamId,
            currentUserId: currentUser.id,
            players: players,
            wordsCount: teamStats ? teamStats.wordsGuessed : 0,
            isCurrentUsersTeam: isCurrentUsersTeam,
            guessedWords: wordsGuessed,
            roundsPerTeam: roundsCount,
            place: place
        }
    }


    return (
        <>
            {
                Object.keys(playersGroupedByTeam)
                    .map(teamId => constructTeamPanelProps(
                            game,
                            gameReport,
                            currentUser,
                            playersGroupedByTeam,
                            teamId
                        )
                    )
                    .sort((tp, tp2) => tp.place - tp2.place)
                    .map((teamProps: TeamResultsPanelProps) => {
                        return (
                            <div key={teamProps.teamId}>
                                <TeamResultsPanel {...teamProps}/>
                            </div>
                        )
                    })
            }
        </>
    )

}

type Props = {
    game: Game,
    currentUser: User,
    gameUsers: User[],
    gameReport: GameReport,
};


export default TeamResultsList;