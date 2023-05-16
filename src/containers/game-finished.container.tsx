import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import Loading from "../components/common/loading.component";
import {getGameReportAction} from "../slice/game-report.slice";
import GameResults from "../components/common/game-results.component";
import {useEffect} from "react";
import {getGameAction} from "../slice/game.slice";

const GameFinishedContainer: React.FC<Props> = ({
                                                    userState,
                                                    gameState,
                                                    gameUsersState,
                                                    gameReportState,
                                                    getGameReport,
                                                    getGame
                                                }) => {

    const {t} = useTranslation();

    const {user} = userState;
    const {game, loading: gameLoading} = gameState;
    const {users} = gameUsersState;
    const {gameReport} = gameReportState;

    useEffect(() => {
        if (game) {
            getGame(game.id)
            getGameReport(game.id)
            return;
        }
    }, [])

    return (
        <>
            <Header/>
            <div className="px-1 px-lg-4 text-center">
                <h1 className="display-3 fw-bold"> {t("gameFinished.title")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    {gameLoading && <Loading/>}
                    {game && user && gameReport &&
                        <GameResults game={game} currentUser={user} gameUsers={users} gameReport={gameReport}/>
                    }
                </div>
            </div>
        </>
    )

}
const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    gameUsersState: state.gameUsers,
    gameReportState: state.gameReport
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getGameReport: async (gameId: string) => await dispatch(getGameReportAction(gameId)),
    getGame: async (gameId: string) => await dispatch(getGameAction(gameId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GameFinishedContainer);
