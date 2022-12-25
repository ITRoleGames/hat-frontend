import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "reducers/combine";

const Header: React.FC<HeaderProps> = ({ userState }) => {

    const { t } = useTranslation();
    const userName = userState.user?.name ? userState.user?.name : t("header.unknownRacoon");

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className="navbar-brand" to={ "/" }>{ t("hat") }</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <div>
                            { t("header.hello") }, {userName}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
});

type HeaderProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, null);

export default connector(Header);
