import {Container, Nav, Navbar} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {connect, ConnectedProps} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "reducers/combine";
import {ReactComponent as Logo} from "./hat.svg";

const Header: React.FC<HeaderProps> = ({userState, gameState, eventState}) => {

    const {t} = useTranslation();
    const userName = userState.user?.name ? userState.user?.name : t("header.unknownRacoon");

    eventState.connected
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="navbar-brand" to={"/"}>
                    {eventState.connected && <Logo fill="#198754"/>}
                    {!eventState.connected && <Logo fill="black"/>}
                    {eventState.connecting && <Logo fill="yellow"/>}
                    &nbsp;
                    {t("hat")}

                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <div>
                            {t("header.hello")}, {userName}. &nbsp;
                            {gameState.game && <span>{t("currentGame.code")}: {gameState.game.code} </span>}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
    gameState: state.game,
    eventState: state.eventState,
});

type HeaderProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, null);

export default connector(Header);
