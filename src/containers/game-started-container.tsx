import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import WarningMessage from "../components/common/warning-message.component";
import TeamPanel from "../components/common/team-panel.component";
import {PlayerWithName} from "../dto/player-with-name";
import {PlayerStatus} from "../model/player-status";
import GameStats from "../components/common/game-stats";

const GameStartedContainer: React.FC<Props> = ({gameState}) => {

    const {t} = useTranslation();

    const currentUserId = gameState.game?.creatorId;

    const teamPanelPros = {
        currentUserId: currentUserId!!,
        players: [
            {
                id: "a11c0c04-b2a1-4dff-9bde-cf0772348783",
                status: PlayerStatus.READY,
                name: "Первый игрок"
            } as PlayerWithName,
            {
                id: "a11c0c04-b2a1-4dff-9bde-cf0772348783",
                status: PlayerStatus.READY,
                name: "Второй игрок"
            } as PlayerWithName
        ],
        wordsCount: 0,
        isCurrentUsersTeam: true,
        isTeamPlaying: true,
        roundTime: 30,
    }

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-3 fw-bold"> {t("gameStarted.title")} </h1>
                <div className="col-lg-3 col-md-5 mx-auto">
                    <GameStats wordsCount="80"/>
                    <WarningMessage message={t("game.youTurn")}/>
                    <TeamPanel {...teamPanelPros}/>
                </div>
            </div>
        </>
    )

};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>;

export default connector(GameStartedContainer);