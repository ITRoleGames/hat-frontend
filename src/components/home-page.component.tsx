import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div className="px-4 text-center">
            <div className="py-5 d-grid gap-5 col-lg-6 mx-auto">
                <Link to="createGame" relative="path" className="btn btn-lg btn-primary">
                    { t("homePage.btn.newGame") }
                </Link>
                <Link to="joinGame" relative="path" className="btn btn-lg btn-success">
                    { t("homePage.btn.joinGame") }
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
