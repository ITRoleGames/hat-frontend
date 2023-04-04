import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";

import {connect, ConnectedProps, useSelector} from "react-redux";
import WordValues from "../components/add-words/add-words-form-data";
import {AddWordsData} from "../model/add-words-data.model";
import {RootState} from "../reducers/combine";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {addWordsAction} from "../actions/word.action";
import {getGameAction} from "../actions/game.action";
import AddWordsForm from "../components/add-words/add-words-form.component";
import Loading from "../components/common/loading.component";
import {useNavigate} from "react-router";
import {useCallback, useEffect, useMemo, useRef} from "react";

const AddWordsContainer: React.FC<AddWordsProps> = ({addWords, getGame}) => {

    const navigate = useNavigate();
    const {t} = useTranslation();

    const game = useSelector((state: RootState) => state.game.game)
    const isGameLoading = useSelector((state: RootState) => state.game.loading)

    const gameMemo = useMemo(() => game, []);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
    });

    const handleFormSubmission = useCallback(async (formData: WordValues) => {
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
    },[]);

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1>{t("addWords.title")}</h1>
                <div>
                    {isFirstRender.current && isGameLoading && <Loading/>}
                    {gameMemo && <AddWordsForm onFormSubmit={handleFormSubmission} gameId={gameMemo.id}
                                           wordsPerPlayer={gameMemo.wordsPerPlayer} loading={false}/>}
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => ({
    addWords: async (data: AddWordsData) => await dispatch(addWordsAction(data)),
    getGame: async (gameId: string) => await dispatch(getGameAction(gameId))
});


const connector = connect(null, mapDispatchToProps);

type AddWordsProps = ConnectedProps<typeof connector>;

export default connector(AddWordsContainer);
