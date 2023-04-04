import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import InputWithCopyButton from "./input-with-copy-button";
import {Telegram} from "react-bootstrap-icons";

const GameCreated: React.FC<Props> = ({gameCode}) => {

    const {t} = useTranslation();

    const shareWithTelegram = (gameCode: string) => {
        const url = `${window.location.origin}/joinGame?code=${gameCode}`
        const text = `${t("gameCreated.code")}: ${gameCode}`
        window.location.href = `tg://msg_url?url=${url}&text=${text}`
    };

    return (
        <div className="px-4 text-center">
            <h1 className="display-3 fw-bold"> {t("gameCreated.title")} </h1>
            <div className="col-lg-6 mx-auto">
                <InputWithCopyButton value={gameCode} label={t("gameCreated.code")}/>
            </div>
            <div className="py-5 d-grid gap-5 gap-5 col-lg-6 mx-auto">
                <Button variant="success" size="lg" onClick={() => shareWithTelegram(gameCode)}>
                    {t("btn.share")} &nbsp;
                    <Telegram/>
                </Button>
                <Link to="/addWords" className="btn btn-lg btn-primary"> {t("btn.next")} </Link>
            </div>
        </div>
    );
};

type Props = {
    gameCode: string,
};

export default GameCreated;
