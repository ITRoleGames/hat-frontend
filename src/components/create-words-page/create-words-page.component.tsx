import Header from "components/header/header.component";
import { useTranslation } from "react-i18next";

const CreateWordsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="px-4 text-center">
            <Header/>
            <h1>{ t("createWords.title") }</h1>
        </div>
    );
};

export default CreateWordsPage;
