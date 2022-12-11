import { getCurrentUserAction } from "actions/user.action";
import { FC } from "react";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "reducers/combine";
import { ThunkDispatch } from "redux-thunk";
import { isUserLoggedIn } from "service/local-storage";

interface PrivateRouteProps {
    component: React.FC;
}

const PrivateRoute: FC<PrivateRouteProps & ConnectedProps<typeof connector>> = ({
                                                                                       component: Component,
                                                                                       userState,
                                                                                       getUser,
                                                                                   }) => {
    if (isUserLoggedIn()) {
        if (userState.user == null && !userState.loading) {
            getUser();
        }
        return <Component/>;
    }

    return <Navigate to="/"/>;
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getUser: async () => await dispatch(getCurrentUserAction()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PrivateRoute);
