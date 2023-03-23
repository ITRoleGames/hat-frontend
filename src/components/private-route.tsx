import {getCurrentUserAction} from "actions/user.action";
import {FC, useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {getGameIdFromLocalStorage, isUserLoggedIn} from "service/local-storage";
import {getGameAction} from "../actions/game.action";
import {getGameUsersAction} from "../slice/game-users.slice";
import {Action} from "redux";
import Loading from "./common/loading.component";

interface PrivateRouteProps {
    component: React.FC;
}

const PrivateRoute: FC<PrivateRouteProps & ConnectedProps<typeof connector>> = (
    {
        component: Component,
        userState,
        gameState,
        gameUsersState,
        getUser,
        getGame,
        getGameUsers
    }
) => {
    const [ready, setReady] = useState(false);

    if (!isUserLoggedIn()) {
        return <Navigate to="/"/>
    }

    const {game, loading: gameLoading, error: gameError} = gameState;
    const {user, loading: userLoading, error: userError} = userState;
    const {users, loading: gameUsersLoading} = gameUsersState;

    const loadGame = () => {
        if (!game && !gameLoading && !gameError) {
            const gameId = getGameIdFromLocalStorage();
            if (gameId) {
                getGame(gameId).then(game => {
                        if (game.players.length > users.length && !gameUsersLoading)
                            getGameUsers(game.players.map(p => p.userId)).then(_ => {
                                setReady(true)
                            })
                    }
                )
            }
        } else if (game && game.players.length > users.length && !gameUsersLoading && !gameError) {
            getGameUsers(game.players.map(p => p.userId)).then(_ => {
                setReady(true)
            })
        } else {
            setReady(true)
        }
    }

    useEffect(() => {
        if (ready) return;
        if (!user && !userLoading && !userError) {
            getUser().then(_ => loadGame())
        } else {
            loadGame()
        }

    }, [ready])

    return (
        <>
            {ready && <Component/>}
            {!ready && <Loading/>}
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    gameUsersState: state.gameUsers
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getUser: async () => await dispatch(getCurrentUserAction()),
    getGame: async (id: string) => await dispatch(getGameAction(id)),
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PrivateRoute);
