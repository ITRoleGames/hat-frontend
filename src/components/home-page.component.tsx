import Header from "components/header/header.component";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import generatedGitInfo from "../generatedGitInfo.json";

const HomePage = () => {
    const {t} = useTranslation();
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
                    <p className="text-secondary">{generatedGitInfo.gitVersion}{generatedGitInfo.isDirty ? "-dirty" : ""}</p>
                </div>
            </div>

        </>
    );
};

export default HomePage;
