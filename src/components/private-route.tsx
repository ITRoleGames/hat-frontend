import {getCurrentUserAction} from "actions/user.action";
import {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {getGameId, isUserLoggedIn} from "service/local-storage";
import {getGameAction} from "../actions/game.action";

interface PrivateRouteProps {
    component: React.FC;
}

const PrivateRoute: FC<PrivateRouteProps & ConnectedProps<typeof connector>> = (
    {
        component: Component,
        userState,
        gameState,
        getUser,
        getGame
    }
) => {
    if (isUserLoggedIn()) {
        if (userState.user == null && !userState.loading) {
            getUser();
        }

        if (gameState.game == null && !gameState.loading) {
            const gameId = getGameId();
            if (gameId) {
                getGame(gameId);
            }
        }
        return <Component/>;
    }

    return <Navigate to="/"/>;
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getUser: async () => await dispatch(getCurrentUserAction()),
    getGame: async (id: string) => await dispatch(getGameAction(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PrivateRoute);
