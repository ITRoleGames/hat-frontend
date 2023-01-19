import Header from "../header/header.component";
import {useTranslation} from "react-i18next";
import PlayersList from "./player-list.component";
import {RootState} from "../../reducers/combine";
import {connect, ConnectedProps} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {getGameUsersAction} from "../../slice/game-users.slice";
import {useEffect} from "react";

const WaitingPlayersPage: React.FC<Props> = ({gameState, gameUsersState, getGameUsers}) => {

    const {t} = useTranslation();
    const loading = gameState.loading || gameUsersState.loading

    useEffect(() => {
        if (gameState.loading || gameUsersState.loading) {
            return
        }

        if (gameState.game && (gameState.game.users.length > gameUsersState.users.length)) {
            getGameUsers(gameState.game.users.map(u => u))
        }
    }, [gameState])

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-5 fw-bold">{t("waitingPlayers.title")}</h1>
                {loading && <>Loading...</>}
                {!loading && <PlayersList game={gameState.game!!} gameUsers={gameUsersState.users}/>}
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
    gameUsersState: state.gameUsers,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    getGameUsers: async (ids: string[]) => await dispatch(getGameUsersAction(ids)),
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WaitingPlayersPage);
