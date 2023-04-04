import Header from "components/header/header.component";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "reducers/combine";
import GameCreated from "../components/game-created/game-created.component.";
import Loading from "../components/common/loading.component";
import {useMemo} from "react";

const GameCreatedContainer: React.FC<GameCreatedProps> = ({gameState}) => {

    const {game, loading} = gameState;

    const gameCode = useMemo(() => game?.code, []);

    const memo = useMemo(() => {
        return(
            <>
                <Header/>
                {loading && <Loading/>}
                {(!loading && gameCode) && <GameCreated gameCode={gameCode}/>}
            </>
        )
    },[])

    return (memo)
};

const mapStateToProps = (state: RootState) => ({
    gameState: state.game,
});

const connector = connect(mapStateToProps, null);

type GameCreatedProps = ConnectedProps<typeof connector>;

export default connector(GameCreatedContainer);
