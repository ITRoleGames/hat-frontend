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
import {useEffect} from "react";

const GuessContainer: React.FC<Props> = ({userState, gameState, gameUsersState,currentRoundState,getCurrentRound}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentRoundState.loading || !gameState.game || gameState.loading) {
            return
        }

        if (!currentRoundState.round && !currentRoundState.error && gameState.game) {
            getCurrentRound(gameState.game.id)
        }

    }, [currentRoundState, gameState])

    const handleTimerComplete = () => {
        navigate("/gameStarted");
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

                            <RoundTimer roundStart={currentRoundState.round.startTime}
                                        moveTimeInSec={gameState.game.moveTime}
                                        onComplete={handleTimerComplete}
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
    getCurrentRound: async (gameId: string) => await dispatch(getCurrentRoundAction(gameId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GuessContainer);