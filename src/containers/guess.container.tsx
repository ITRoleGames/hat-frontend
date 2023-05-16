import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import RoundTimer from "../components/common/timer.component";
import Loading from "../components/common/loading.component";
import {useNavigate} from "react-router";
import {getCurrentRoundAction} from "../slice/round.slice";
import {useEffect, useRef, useState} from "react";
import {RoundStatus} from "../model/round-status";
import {calculateRoundTime} from "../utils/time-util";
import {GameStatus} from "../model/game-status";

const GuessContainer: React.FC<Props> = ({
                                             userState,
                                             gameState,
                                             gameUsersState,
                                             currentRoundState,
                                             getCurrentRound
                                         }) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const refTimer = useRef<number | null>(null);
    const [roundActive, setRoundActive] = useState(true);

    const {game, loading: gameLoading} = gameState;
    const {round: currentRound, loading: currentRoundLoading} = currentRoundState;

    useEffect(() => {
        if (currentRound?.status == RoundStatus.FINISHED) {
            navigate("/gameStarted");
        }
    }, [currentRoundState])

    useEffect(() => {
        if (!game || currentRoundLoading || gameLoading) {
            return
        }

        if (!currentRound && !currentRoundState.error) {
            getCurrentRound(game.id)
        }

    }, [currentRoundState, gameState])

    useEffect(() => {
        if (game?.status == GameStatus.FINISHED) {
            navigate("/gameFinished");
        }
    }, [gameState])

    const handleTimerComplete = () => {
        setRoundActive(false)
        getCurrentRound(game!!.id).then(round => {
            if (round?.status == RoundStatus.FINISHED) {
                navigate("/gameStarted");
            } else {
                refTimer.current = window.setTimeout(() => {
                    getCurrentRound(game!!.id).then(_ => {
                        navigate("/gameStarted");
                    });
                }, 500);
            }
        })
    }

    useEffect(() => {
        return () => {
            if (refTimer.current !== null) {
                window.clearTimeout(refTimer.current);
            }
        };
    }, []);

    let timerValue = 0;
    if (currentRound && game) {
        timerValue = calculateRoundTime(currentRound.startTime, game.moveTime)
    }

    return (
        <>
            <Header/>
            <div className="px-1 py-5 px-lg-4 text-center">
                <h1 className="display-6"> {t("round.youGuess")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    {(gameState.loading || currentRoundState.loading) && <Loading/>}
                    {gameState.game && currentRoundState.round &&
                        <>
                            <h3 className="display-6 fw-bold py-3">???</h3>
                            {roundActive && <RoundTimer seconds={timerValue} onComplete={() => handleTimerComplete()}/>}
                            {!roundActive && <span>{t("round.finished")}</span>}
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
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GuessContainer);
