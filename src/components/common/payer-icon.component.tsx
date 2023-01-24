import {PlayerStatus} from "../../model/player-status";
import {PersonCircle} from "react-bootstrap-icons";

function PlayerIcon({playerStatus}: Props) {

    let color = "grey"
    if (playerStatus == PlayerStatus.READY) {
        color = "green"
    }

    return (
        <PersonCircle size="50" color={color}/>
    )
}

type Props = {
    playerStatus: PlayerStatus
};

export default PlayerIcon;