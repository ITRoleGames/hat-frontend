import { createGameAction } from "actions/game.action";
import { createUserAction } from "actions/user.action";
import CreateGameForm from "components/create-game/create-game-form.component";
import { CreateGameData } from "model/create-game-data.model";
import { User } from "model/user.model";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "reducers/combine";
import { ThunkDispatch } from "redux-thunk";


const CreateGamePage: React.FC<CreateGameProps> = ({
                                                   userState,
                                                   gameState,
                                                   createUser,
                                                   createGame,
                                               }) => {
    const { loading } = userState;
    const navigate = useNavigate();

    const handleFormSubmission = async (formData: any) => {
        createUser().then((user: User) => {
                const data: CreateGameData = {
                    creatorId: user.id,
                    wordsPerParticipant: formData.wordsPerParticipant,
                    moveTime: formData.moveTime,
                };
                createGame(data).then(() => navigate("/gameCreated"));
            },
        );
    };

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-1 fw-bold">Создать игру</h1>
            <h2 className="display-5 fw-bold">Настройки</h2>
            <CreateGameForm onFormSubmit={ handleFormSubmission } loading={ loading }/>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    createUser: async () => await dispatch(createUserAction()),
    createGame: async (data: CreateGameData) => await dispatch(createGameAction(data)),
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateGameProps = ConnectedProps<typeof connector>;

export default connector(CreateGamePage);
