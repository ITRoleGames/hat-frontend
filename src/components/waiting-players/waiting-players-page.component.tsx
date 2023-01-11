import Header from "../header/header.component";
import {useTranslation} from "react-i18next";

const WaitingPlayersPage = () => {

    const {t} = useTranslation();

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-3 fw-bold"> {t("waitingPlayers.title")} </h1>
            </div>
        </>
    );
};

export default WaitingPlayersPage