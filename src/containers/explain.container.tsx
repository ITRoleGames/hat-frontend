import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import Loading from "../components/common/loading.component";
import {finishRoundAction, getCurrentRoundAction, nextExplanationAction} from "../slice/round.slice";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {UpdateExplanationData} from "../model/update-explanation-data.mode";
import {useNavigate} from "react-router";
import RoundTimer from "../components/common/timer.component";
import {RoundStatus} from "../model/round-status";
import {calculateRoundTime} from "../utils/time-util";
import {ExplanationResult} from "../model/explanation-result";

const ExplainContainer: React.FC<Props> = ({
                                               userState,
                                               gameState,
                                               gameUsersState,
                                               currentRoundState,
                                               getCurrentRound,
                                               nextExplanation,
                                               finishRound
                                           }) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [roundActive, setRoundActive] = useState(true);
    const word = currentRoundState.round ? currentRoundState.round.explanation.wordValue : t("loading");

    const {round: currentRound, loading: currentRoundLoading} = currentRoundState;
    const {game, loading: gameLoading} = gameState;

    useEffect(() => {
        if (currentRoundState.round?.status == RoundStatus.FINISHED) {
            navigate("/gameStarted");
        }
    }, [currentRoundState])

    useEffect(() => {
        if (currentRoundState.loading || !gameState.game || gameState.loading) {
            return
        }

        if (!currentRoundState.round && !currentRoundState.error && gameState.game) {
            getCurrentRound(gameState.game.id)
        }

    }, [currentRoundState, gameState])

    const handleTimerComplete = () => {
        setRoundActive(false)
        if (!currentRoundState.loading && currentRoundState.round?.status == RoundStatus.STARTED) {
            finishRound(gameState.game!!.id, currentRoundState.round!!.id).then(() => {
                navigate("/gameStarted");
            })
        }
    }

    let timerValue = 0;
    if (currentRound && game) {
        timerValue = calculateRoundTime(currentRound.startTime, game.moveTime)
    }

    const handleGuessed = () => {

        if (!gameState.game || !currentRoundState.round) {
            return;
        }

        const gameId = gameState.game.id;
        const roundId = currentRoundState.round.id;
        const explanationId = currentRoundState.round.explanation.id

        const data = {
            id: explanationId,
            result: ExplanationResult.EXPLAINED,
            endTime: new Date()
        } as UpdateExplanationData

        nextExplanation(gameId, roundId, data)
    }

    return (
        <>
            <Header/>
            <div className="px-1 py-5 px-lg-4 text-center">
                <h1 className="display-6"> {t("round.youExplain")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    {(gameState.loading || currentRoundState.loading) && <Loading/>}
                    {gameState.game && currentRoundState.round &&
                        <>
                            <h3 className="display-6 fw-bold py-3">{word}</h3>
                            {roundActive &&
                                <RoundTimer seconds={timerValue} onComplete={() => handleTimerComplete()}/>
                            }
                            {!roundActive && <span>{t("round.finished")}</span>}
                            <div className="px-4 py-5 d-grid gap-5 mx-auto">
                                <Button variant="success" size="lg" onClick={handleGuessed}>
                                    {t("round.guessed")}
                                </Button>
                            </div>
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
    getCurrentRound: async (gameId: string) => await dispatch(getCurrentRoundAction(gameId)),
    finishRound: async (gameId: string, roundId: number) => await dispatch(finishRoundAction(gameId, roundId)),
    nextExplanation: async (gameId: string, roundId: number, data: UpdateExplanationData) => await dispatch(nextExplanationAction(gameId, roundId, data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ExplainContainer);