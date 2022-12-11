import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="px-4 text-center">
            <div className="py-5 d-grid gap-5 col-lg-6 mx-auto">
                <Link to="createGame" relative="path" className="btn btn-lg btn-primary">
                    Новая игра
                </Link>
                <Link to="joinGame" relative="path" className="btn btn-lg btn-success">
                    Войти в игру
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
