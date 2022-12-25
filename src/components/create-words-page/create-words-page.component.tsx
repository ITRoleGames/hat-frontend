import Header from "components/header/header.component";
import { useTranslation } from "react-i18next";

const CreateWordsPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1>{ t("createWords.title") }</h1>
            </div>
        </>
    );
};

export default CreateWordsPage;
