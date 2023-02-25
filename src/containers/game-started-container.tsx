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
                                currentUser={userState.user}
                                gameUsers={gameUsersState.users}
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
    gameUsersState: state.gameUsers
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(GameStartedContainer);