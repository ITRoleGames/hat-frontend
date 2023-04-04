import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import Loading from "../components/common/loading.component";
import GameStats from "../components/common/game-stats";
import TeamList from "../components/common/team-list";
import {getCurrentRoundAction, startRoundAction} from "../slice/round.slice";
import {useNavigate} from "react-router";
import {RoundStatus} from "../model/round-status";
import {getGameReportAction} from "../slice/game-report.slice";

const GameStartedContainer: React.FC<Props> = ({
                                                   userState,
                                                   gameState,
                                                   gameUsersState,
                                                   currentRoundState,
                                                   gameReportState,
                                                   getGameReport,
                                                   startRound,
                                                   getCurrentRound
                                               }) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const {round: currentRound, loading: currentRoundLoading, error: currentRoundError} = currentRoundState;
    const {user} = userState;
    const {game, loading: gameLoading} = gameState;
    const {users, loading: usersLoading} = gameUsersState;
    const {gameReport} = gameReportState;

    useEffect(() => {
        if (game && !currentRound && !currentRoundLoading && !currentRoundError) {
            getCurrentRound(game.id)
            return;
        }
    }, [currentRoundState, gameState])

    useEffect(() => {
        if (!game || !currentRound || currentRoundLoading) {
            return;
        }

        if (currentRound && !currentRoundLoading && !currentRoundError) {
            const currentPlayer = game.players.find(player => player.userId == user?.id);
            const explainerId = currentRound.explainerId;
            if (!currentPlayer) {
                console.error("Current player not found")
                return;
            }
            if (currentPlayer.id == explainerId) {
                return;
            }

            const currentExplainer = game.players.find(player => player.id == explainerId);

            if (!currentExplainer) {
                console.error("Current explainer not found")
                return;
            }

            if (currentRound.status == RoundStatus.STARTED
                && currentExplainer.userId != currentPlayer?.userId
                && currentExplainer.teamId == currentPlayer?.teamId
            ) {
                navigate("/guess")
            }
        }

    }, [currentRoundState, gameState])

    useEffect(() => {
        if (game) {
            getGameReport(game.id)
            return;
        }
    }, [currentRoundState])


    const handleStartRound = (gameId: string) => {
        startRound(gameId).then(() => {
            navigate("/explain")
        })
    }

    return (
        <>
            <Header/>
            <div className="px-1 px-lg-4 text-center">
                <h1 className="display-3 fw-bold"> {t("gameStarted.title")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    {gameLoading && <Loading/>}
                    {game && user &&
                        <>
                            <GameStats
                                wordsCount={game.wordsCount}
                                wordsGuessed={gameReport?.wordsGuessed}
                                totalTime={gameReport?.totalTime}
                            />
                            <TeamList
                                game={game}
                                currentRound={currentRound}
                                currentUser={user}
                                gameUsers={users}
                                gameReport={gameReport}
                                startRound={handleStartRound}
                            />
                        </>
                    }
                </div>
            </div>
        </>
    )
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    gameUsersState: state.gameUsers,
    currentRoundState: state.round,
    gameReportState: state.gameReport
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    startRound: async (gameId: string) => await dispatch(startRoundAction(gameId)),
    getCurrentRound: async (gameId: string) => await dispatch(getCurrentRoundAction(gameId)),
    getGameReport: async (gameId: string) => await dispatch(getGameReportAction(gameId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GameStartedContainer);