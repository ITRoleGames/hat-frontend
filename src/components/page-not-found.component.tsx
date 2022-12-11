import { Component } from "react";
import { Link } from "react-router-dom";

export class PageNotFound extends Component<{}, {}> {

    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-1 fw-bold">Страница не найдена</h1>
                <Link to={ "/" }>На главную</Link>
            </div>
        );
    }
}
