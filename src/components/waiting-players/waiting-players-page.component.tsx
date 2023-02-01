import Header from "../header/header.component";
import {useTranslation} from "react-i18next";
import PlayersList from "./player-list.component";
import {RootState} from "../../reducers/combine";
import {connect, ConnectedProps} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {getGameUsersAction} from "../../slice/game-users.slice";
import {useEffect} from "react";
import {Player} from "../../model/player.model";
import {startGameAction} from "../../actions/game.action";
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";

const WaitingPlayersPage: React.FC<Props> = ({gameState, gameUsersState, getGameUsers, startGame}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const players: Player[] = gameState?.game?.players ? gameState.game.players : []
    useEffect(() => {
        if (gameState.loading || gameUsersState.loading) {
            return
        }

        if (gameState.game && (gameState.game.players.length > gameUsersState.users.length)) {
            getGameUsers(gameState.game.players.map(player => player.userId))
        }
    }, [gameState])

    const handleStartGame = async (gameId: string) => {
        startGame(gameId).then(() => navigate("/gameStarted"));
    };

    const gameId = gameState.game?.id;
    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-5 fw-bold">{t("waitingPlayers.title")}</h1>
                <PlayersList payers={players} gameUsers={gameUsersState.users}/>
                { gameId &&
                    <Button onClick={() => handleStartGame(gameId)} className="btn btn-lg btn-primary">
                        {t("btn.createTeams")}
                    </Button>
                }

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
    startGame: async (gameId: string) => await dispatch(startGameAction(gameId)),
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WaitingPlayersPage);
