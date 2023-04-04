import {createUserAction} from "actions/user.action";
import CreateGameForm from "components/create-game/create-game-form.component";
import Header from "components/header/header.component";
import {CreateGameData} from "model/create-game-data.model";
import {User} from "model/user.model";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router";
import {RootState} from "reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {createGameAction} from "../../slice/game.slice";


const CreateGamePage: React.FC<CreateGameProps> = ({userState, createUser, createGame}) => {
    const {loading} = userState;
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleFormSubmission = async (formData: CreateGameData) => {
        createUser().then((user: User) => {
                formData.creatorId = user.id
                createGame(formData).then(() => navigate("/gameCreated"));
            },
        );
    };

    return (
        <>
            <Header/>
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-3 fw-bold">{t("createGame.title")}</h1>
                <h2 className="display-6 fw-bold">{t("createGame.settings")}</h2>
                <CreateGameForm onFormSubmit={handleFormSubmission} loading={loading}/>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    createUser: async () => await dispatch(createUserAction()),
    createGame: async (data: CreateGameData) => await dispatch(createGameAction(data)),
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateGameProps = ConnectedProps<typeof connector>;

export default connector(CreateGamePage);
