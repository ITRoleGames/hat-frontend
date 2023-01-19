import {getCurrentUserAction} from "actions/user.action";
import {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {getGameIdFromLocalStorage, isUserLoggedIn} from "service/local-storage";
import {getGameAction} from "../actions/game.action";
import {getGameUsersAction} from "../slice/game-users.slice";
import {Action} from "redux";

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
    if (isUserLoggedIn()) {
        if (userState.user == null && !userState.loading && !userState.error) {
            getUser();
        }

        if (gameState.game == null && !gameState.loading && !gameState.error) {
            const gameId = getGameIdFromLocalStorage();
            if (gameId) {
                getGame(gameId).then(game => getGameUsers(game.users))
            }
        }

        return <Component/>;
    }

    return <Navigate to="/"/>;
}

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    gameUsersState: state.gameUsers,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getUser: async () => await dispatch(getCurrentUserAction()),
    getGame: async (id: string) => await dispatch(getGameAction(id)),
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PrivateRoute);
