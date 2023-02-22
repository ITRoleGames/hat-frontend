import Header from "components/header/header.component";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "reducers/combine";
import InputWithCopyButton from "./input-with-copy-button";
import Loading from "../common/loading.component";
import {Telegram} from "react-bootstrap-icons";

const GameCreatedPage: React.FC<GameCreatedProps> = ({gameState}) => {

    const {game, loading} = gameState;
    const {t} = useTranslation();

    const shareWithTelegram = (gameCode: string) => {
        const url = `${window.location.origin}/joinGame?code=${gameCode}`
        const text = `${t("gameCreated.code")}: ${gameCode}`
        window.location.href = `tg://msg_url?url=${url}&text=${text}`
    };

    return (
        <>
            <Header/>
            {loading && <Loading/>}
            {(!loading && game) &&
                <div className="px-4 text-center">
                    <h1 className="display-3 fw-bold"> {t("gameCreated.title")} </h1>
                    <div className="col-lg-6 mx-auto">
                        <InputWithCopyButton value={game.code} label={t("gameCreated.code")}/>
                    </div>
                    <div className="py-5 d-grid gap-5 gap-5 col-lg-6 mx-auto">
                        <Button variant="success" size="lg" onClick={() => shareWithTelegram(game.code)}>
                            {t("btn.share")} &nbsp;
                            <Telegram/>
                        </Button>
                        <Link to="/addWords" className="btn btn-lg btn-primary"> {t("btn.next")} </Link>
                    </div>
                </div>
            }
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const connector = connect(mapStateToProps, null);

type GameCreatedProps = ConnectedProps<typeof connector>;

export default connector(GameCreatedPage);
