import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import generatedGitInfo from "../generatedGitInfo.json";
import {Button} from "react-bootstrap";
import {setLang} from "../service/local-storage";

const HomePage = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (): void => {
        if (i18n.language == "ru") {
            i18n.changeLanguage("en")
            setLang("en")
        } else {
            i18n.changeLanguage("ru")
            setLang("ru")
        }
    }

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <div className="py-5 d-grid gap-5 col-lg-6 mx-auto">
                    <Link to="createGame" relative="path" className="btn btn-lg btn-primary">
                        {t("homePage.btn.newGame")}
                    </Link>
                    <Link to="joinGame" relative="path" className="btn btn-lg btn-success">
                        {t("homePage.btn.joinGame")}
                    </Link>

                    <Button type="button" variant="link" size="sm" onClick={() => changeLanguage()}>
                        {t("btd.changeLang")}
                    </Button>


                    <p className="text-secondary">{generatedGitInfo.gitVersion}{generatedGitInfo.isDirty ? "-dirty" : ""}</p>


                </div>

            </div>

        </>
    );
};

export default HomePage;
