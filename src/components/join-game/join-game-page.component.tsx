import { joinGameAction } from "actions/game.action";
import { createUserAction } from "actions/user.action";
import { JoinGameFormData } from "components/join-game/join-game-form-data";
import JoinGameForm from "components/join-game/join-game-form.component";
import { User } from "model/user.model";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { ThunkDispatch } from "redux-thunk";

const JoinGamePage: React.FC<JoinGameProps> = ({ createUser, joinGame }) => {

    const navigate = useNavigate();
    const loading = false;
    const handleFormSubmission = async (formData: JoinGameFormData) => {
        createUser().then((user: User) => {
                joinGame(formData.code, user.id).then(() => navigate("/createWords"));
            },
        );
    };

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-1 fw-bold">Присоединиться к игре</h1>
            <h2 className="display-5 fw-bold">Ввести код</h2>
            <JoinGameForm onFormSubmit={ handleFormSubmission } loading={ loading }/>
        </div>
    );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    createUser: async () => await dispatch(createUserAction()),
    joinGame: async (code: string, userId: string) => await dispatch(joinGameAction(code, userId)),
});

const connector = connect(null, mapDispatchToProps);

type JoinGameProps = ConnectedProps<typeof connector>;

// export default CreateGamePage;
export default connector(JoinGamePage);

