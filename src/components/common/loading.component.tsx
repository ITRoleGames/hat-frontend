import {useTranslation} from "react-i18next";
import {Spinner} from "react-bootstrap";

function Loading({message}: Props) {
    const {t} = useTranslation();
    const loaderMessage = message ? message : t("loading")

    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">{loaderMessage}</span>
        </Spinner>
    )
}

type Props = {
    message?: string
};

export default Loading;