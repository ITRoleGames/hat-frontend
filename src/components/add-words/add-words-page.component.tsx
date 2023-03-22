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
import {Action} from "redux";
import Loading from "../common/loading.component";
import {getGameAction} from "../../actions/game.action";


const AddWordsPage: React.FC<AddWordsProps> = ({gameState, addWords, getGame}) => {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {loading, game} = gameState;

    const handleFormSubmission = async (formData: WordValues) => {
        const words: string[] = [];
        for (const word of formData.words) {
            words.push(word.value)
        }
        const data: AddWordsData = {
            gameId: formData.gameId,
            words: words
        }

        addWords(data).then(() => {
                if (game) {
                    getGame(game.id).then(() =>
                        navigate("/waitingPlayers")
                    )
                } else {
                    navigate("/waitingPlayers")
                }
            }
        );
    };


    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1>{t("addWords.title")}</h1>
                <div>
                    {loading ? (
                        <Loading/>
                    ) : (
                        game && <AddWordsForm onFormSubmit={handleFormSubmission} game={game} loading={false}/>
                    )}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    addWords: async (data: AddWordsData) => await dispatch(addWordsAction(data)),
    getGame: async (gameId: string) => await dispatch(getGameAction(gameId))
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type AddWordsProps = ConnectedProps<typeof connector>;

export default connector(AddWordsPage);
