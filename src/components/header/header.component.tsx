import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "reducers/combine";

const Header: React.FC<HeaderProps> = ({ userState }) => {

    const userName = userState.user?.name ? userState.user?.name : "Неизвестный енот";

    return (
        <div className="col-lg-6 p-3 bg-light mx-auto">

            <div className="d-flex bd-highlight">
                <div className="py-2 flex-fill bd-highlight text-start">
                    <Link to="/" className="navbar-brand"> Шапка </Link>
                </div>
                <div className="p-2 flex-fill bd-highlight"></div>
                <div className="p-2 flex-fill bd-highlight text-end">Привет, { userName }</div>
            </div>


        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    userState: state.user,
});

type HeaderProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, null);

export default connector(Header);
