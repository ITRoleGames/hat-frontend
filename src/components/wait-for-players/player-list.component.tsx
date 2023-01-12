import { Game } from "model/game.model";
import { PersonCircle } from "react-bootstrap-icons";

type Props = {
    game: Game
};

function PlayersList({ game }: Props) {

    const users = game.users;

    return (
        <>
            {
                users.map(user => {
                    return <div key={user} className="d-flex flex-row">
                        <PersonCircle size="50" color="red"/>
                        <p > { user }</p>
                        </div>
                })
            }
        </>
    );

}

export default PlayersList;
