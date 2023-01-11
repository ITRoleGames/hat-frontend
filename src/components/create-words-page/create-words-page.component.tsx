import CreateWordsForm from "components/create-words-page/create-words-form.component";
import WordValues from "components/create-words-page/wordValues";
import Header from "components/header/header.component";
import { useTranslation } from "react-i18next";


const CreateWordsPage = () => {
    const { t } = useTranslation();

    const handleFormSubmission = async (formData: WordValues) => {

        const words: string [] = [];
        for (const word of formData.words) {
            words.push(word.value)
        }

        alert("form submitted with data: " + JSON.stringify(words));
    };

    const loading = false;

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1>{ t("createWords.title") }</h1>
                <CreateWordsForm onFormSubmit={ handleFormSubmission } loading={ loading }/>
            </div>
        </>
    );
};

export default CreateWordsPage;
