import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {getGameUsersAction} from "../slice/game-users.slice";
import Loading from "../components/common/loading.component";
import GameStats from "../components/common/game-stats";
import TeamList from "../components/common/team-list";
import {getCurrentRoundAction, startRoundAction} from "../slice/round.slice";
import {useNavigate} from "react-router";
import {logInfo} from "../utils/logging.utils";
import {RoundStatus} from "../model/round-status";

const GameStartedContainer: React.FC<Props> = ({
                                                   userState,
                                                   gameState,
                                                   gameUsersState,
                                                   currentRoundState,
                                                   getGameUsers,
                                                   startRound,
                                                   getCurrentRound
                                               }) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (gameState.loading || gameUsersState.loading) {
            return
        }

        if (gameState.game && (gameState.game.players.length > gameUsersState.users.length)) {
            getGameUsers(gameState.game.players.map(player => player.userId))
        }
    }, [gameState])

    useEffect(() => {
        logInfo("round effect")
        if (!gameState.game || currentRoundState.loading) {
            return;
        }

        if (gameState.game && !currentRoundState.round && !currentRoundState.loading && !currentRoundState.error) {
            logInfo("current round loading")
            getCurrentRound(gameState.game.id)
            return;
        }

        if (currentRoundState.round && !currentRoundState.loading && !currentRoundState.error) {
            logInfo("current round loaded")
            const currentPlayer = gameState.game.players.find(player => player.userId == userState.user?.id);
            const explainerId = currentRoundState.round.explainerId;
            if (!currentPlayer) {
                console.error("Current player not found")
                return;
            }
            if (currentPlayer.id == explainerId) {
                return;
            }

            const currentExplainer = gameState.game.players.find(player => player.id = explainerId);

            if (!currentExplainer) {
                console.error("Current explainer not found")
                return;
            }

            if (gameState.game
                && currentRoundState.round
                && currentRoundState.round.status == RoundStatus.STARTED
                && currentExplainer.userId != currentPlayer?.userId
                && currentExplainer.teamId == currentPlayer?.teamId
            ) {
                console.log("navigate to guess")
                navigate("/guess")
            }
        }

    }, [currentRoundState, gameState])


    const handleStartRound = (gameId: string) => {
        console.log("handleStartRound")
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
                    {gameState.loading && <Loading/>}
                    {gameState.game && userState.user != null &&
                        <>
                            <GameStats wordsCount={gameState.game.wordsCount}/>
                            <TeamList
                                game={gameState.game}
                                currentRound={currentRoundState.round}
                                currentUser={userState.user}
                                gameUsers={gameUsersState.users}
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
    currentRoundState: state.round
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
    startRound: async (gameId: string) => await dispatch(startRoundAction(gameId)),
    getCurrentRound: async (gameId: string) => await dispatch(getCurrentRoundAction(gameId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GameStartedContainer);