import Header from "components/header/header.component";
import PlayersList from "components/wait-for-players/player-list.component";
import { useTranslation } from "react-i18next";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { RootState } from "reducers/combine";


const WaitingPlayersPage: React.FC<Props> = ({ gameState }) => {

    const { t } = useTranslation();
    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-5 fw-bold">{ t("waitForPlayers.title") }</h1>
                {!gameState.loading && <PlayersList game={gameState.game!!}/> }
            </div>

        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});


const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>;

export default connector(WaitingPlayersPage);
