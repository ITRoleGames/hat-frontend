import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {PlayerWithName} from "../dto/player-with-name";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {getGameUsersAction} from "../slice/game-users.slice";
import {Player} from "../model/player.model";
import {TeamPanelProps} from "../dto/team-panel-props";
import TeamPanel from "../components/common/team-panel.component";
import Loading from "../components/common/loading.component";
import WarningMessage from "../components/common/warning-message.component";
import GameStats from "../components/common/game-stats";

const GameStartedContainer: React.FC<Props> = ({userState, gameState, gameUsersState, getGameUsers}) => {

    const {t} = useTranslation();

    useEffect(() => {
        if (gameState.loading || gameUsersState.loading) {
            return
        }

        if (gameState.game && (gameState.game.players.length > gameUsersState.users.length)) {
            getGameUsers(gameState.game.players.map(player => player.userId))
        }
    }, [gameState])

    const currentUserId = userState.user?.id
    let playersGroupedByTeam: Record<string, PlayerWithName[]> = {}

    if (gameState.game) {
        const gameUsers = gameUsersState.users;
        const players = gameState.game.players;

        const playersWithNames: PlayerWithName[] = players.map((player: Player): PlayerWithName => {
            const gameUser = gameUsers?.find(gu => gu.id == player.userId);
            return {...player, name: gameUser ? gameUser.name : "unknown"}
        });

        playersGroupedByTeam = groupBy(playersWithNames, (player: PlayerWithName) => {
            return player.teamId
        });
    }

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-3 fw-bold"> {t("gameStarted.title")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    {!gameState.game && <Loading/>}
                    {(gameState.game && userState.user != null) &&
                        <>
                            <GameStats wordsCount="80"/>
                            {
                                Object.keys(playersGroupedByTeam).map(key => {
                                    const players: PlayerWithName[] = playersGroupedByTeam[key]
                                    const isCurrentUser = players.findIndex((player) => player.userId == currentUserId) != -1
                                    const isCurrentUserTurn = players.findIndex((player: Player) => player.id == gameState.game!!.nextPlayerId) != -1,
                                        teamPanelProps: TeamPanelProps = {
                                            currentUserId: userState.user!!.id,
                                            players: players,
                                            wordsCount: 0,
                                            isCurrentUsersTeam: isCurrentUser,
                                            isTeamPlaying: isCurrentUserTurn,
                                            roundTime: 30
                                        }
                                    return (
                                        <>
                                            {isCurrentUserTurn && <WarningMessage message={t("game.youTurn")}/>}
                                            <TeamPanel {...teamPanelProps}/>
                                        </>
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
};

function groupBy<T>(arr: T[], fn: (item: T) => any): Record<string, T[]> {
    return arr.reduce<Record<string, T[]>>((prev, curr) => {
        const groupKey = fn(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return {...prev, [groupKey]: group};
    }, {});
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    gameUsersState: state.gameUsers
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GameStartedContainer);