import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";

import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {addWordsAction} from "../../actions/word.action";
import {AddWordsData} from "../../model/add-words-data.model";
import AddWordsForm from "./add-words-form.component";
import WordValues from "./add-words-form-data";
import {useNavigate} from "react-router";


const AddWordsPage: React.FC<AddWordsProps> = ({gameState, addWords}) => {

    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleFormSubmission = async (formData: WordValues) => {
        const words: string[] = [];
        for (const word of formData.words) {
            words.push(word.value)
        }
        const data: AddWordsData = {
            gameId: gameState.game!!.id,
            words: words
        }
        addWords(data).then(() => navigate("/waitingPlayers"));
    };

    if(gameState.loading){

        return <>Loading</>
    }

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1>{t("addWords.title")}</h1>
                <div>
                    <AddWordsForm onFormSubmit={handleFormSubmission} game={gameState.game!!} loading={false}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    addWords: async (data: AddWordsData) => await dispatch(addWordsAction(data)),
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type AddWordsProps = ConnectedProps<typeof connector>;

export default connector(AddWordsPage);
