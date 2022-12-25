import { Component } from "react";
import { WithTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

class PageNotFound extends Component<WithTranslation, { }> {

    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-3 fw-bold">{ this.props.t("pageNotFound.warning") }</h1>
                <Link to={ "/" }>{ this.props.t("pageNotFound.btn.home") }</Link>
            </div>
        );
    }
}


export default withTranslation()(PageNotFound);
