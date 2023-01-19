import Header from "../header/header.component";
import {useTranslation} from "react-i18next";
import PlayersList from "./player-list.component";
import {RootState} from "../../reducers/combine";
import {connect, ConnectedProps} from "react-redux";

const WaitingPlayersPage: React.FC<Props> = ({gameState, gameUsersState}) => {

    const {t} = useTranslation();
    const loading = gameState.loading || gameUsersState.loading

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


const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>;

export default connector(WaitingPlayersPage);
