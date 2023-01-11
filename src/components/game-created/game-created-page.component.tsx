import Header from "components/header/header.component";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "reducers/combine";

const GameCreatedPage: React.FC<GameCreatedProps> = ({ gameState }) => {

    const { game } = gameState;
    const { t } = useTranslation();

    return (
        <>
            <Header/>
            <div className="px-4 text-center">
                <h1 className="display-3 fw-bold"> { t("gameCreated.title") } </h1>
                <h2 className="display-6">{ t("gameCreated.code") }</h2>
                <div className="display-5">{ game?.code }</div>

                <div className="py-5 d-grid gap-5 gap-5 col-lg-6 mx-auto">
                    <Button variant="success" size="lg" onClick={ () => {
                        alert("Not impl");
                    } }> { t("btn.share") } </Button>
                    <Link to="/addWords" className="btn btn-lg btn-primary"> { t("btn.next") } </Link>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const connector = connect(mapStateToProps, null);

type GameCreatedProps = ConnectedProps<typeof connector>;

export default connector(GameCreatedPage);
