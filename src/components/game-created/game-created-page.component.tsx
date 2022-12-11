import Header from "components/header/header.component";
import { Button } from "react-bootstrap";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "reducers/combine";

const GameCreatedPage: React.FC<GameCreatedProps> = ({ gameState }) => {

    const { game } = gameState;

    return (
        <div className="px-4 text-center">
            <Header/>
            <h1 className="display-1 fw-bold">Игра создана</h1>
            <h2 className="display-5">Код для подключения</h2>
            <div className="display-5">{ game?.code }</div>

            <div className="py-5 d-grid gap-5 gap-5 col-lg-6 mx-auto">
                <Button variant="success" size="lg" onClick={ () => {
                    alert("Not impl");
                } }> Поделиться </Button>
                <Link to="/createWords" className="btn btn-lg btn-primary"> Далее </Link>
            </div>

        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const connector = connect(mapStateToProps, null);

type GameCreatedProps = ConnectedProps<typeof connector>;

export default connector(GameCreatedPage);
