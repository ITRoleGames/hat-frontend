import {User} from "model/user.model";
import {Player} from "../../model/player.model";
import {PlayerWithName} from "../../dto/player-with-name";
import PlayerIcon from "../common/payer-icon.component";

type Props = {
    payers: Player[],
    gameUsers: User[]
};

function PlayersList({payers = [], gameUsers}: Props) {

    const players: PlayerWithName[] = payers.map((player: Player): PlayerWithName => {
        const gameUser = gameUsers?.find(gu => gu.id == player.userId);
        return {...player, name: gameUser ? gameUser.name : "unknown"}
    });

    return (
        <div className="col-lg-2 col-md-5 mx-auto d-flex flex-column">
            {
                players.map(player => {
                    return <div key={player.id} className="d-flex flex-row justify-content-left mb-2">
                        <PlayerIcon playerStatus={player.status}/>
                        <div className="align-self-center text-start ms-2"> {player.name}</div>
                    </div>
                })
            }
        </div>
    );
}

export default PlayersList;
