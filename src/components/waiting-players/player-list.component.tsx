import {Game} from "model/game.model";
import {User} from "model/user.model";
import {PersonCircle} from "react-bootstrap-icons";

type Props = {
    game: Game,
    gameUsers: User[]
};

function PlayersList({game, gameUsers}: Props) {

    const users = game.users.map(u => {
        const gameUser = gameUsers?.find(gu => gu.id == u);
        return {id: u, name: gameUser?.name}
    });

    return (
        <div className="col-lg-2 col-md-5 mx-auto d-flex flex-column">
            {
                users.map(user => {
                    return <div key={user.id} className="d-flex flex-row justify-content-left mb-2">
                        <PersonCircle size="50" color="grey"/>
                        <div className="align-self-center text-start ms-2"> {user.name ? user.name : user.id}</div>
                    </div>
                })
            }
        </div>
    );
}

export default PlayersList;
