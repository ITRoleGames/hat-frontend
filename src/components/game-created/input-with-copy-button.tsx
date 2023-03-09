import {useTranslation} from "react-i18next";
import {Files} from "react-bootstrap-icons";
import {Store} from "react-notifications-component";

function InputWithCopyButton({value, label}: Props) {

    const {t} = useTranslation();

    const copyToClipboard = async (text: string) => {
      await navigator.clipboard.writeText(text).then(() => notifyCopied())
    }

    const notifyCopied = () => {
        Store.addNotification({
            message: t("codeCopiedToClipboard"),
            type: "info",
            insert: "top",
            container: "top-full",
            animationIn: [ "animate__animated", "animate__fadeIn" ],
            animationOut: [ "animate__animated", "animate__fadeOut" ],
            dismiss: {
                duration: 2000,
                onScreen: true,
            },
        });
    }
    return (
        <div className="col-lg-3 mx-auto">
            <label htmlFor="game-code" className="col-form-label">{label}</label>
            <div className="input-group input-group-lg">
                <input type="text"
                       id="game-code"
                       className="form-control"
                       aria-label="Recipient's username"
                       aria-describedby="button-addon2"
                       value={value}
                       disabled={true}
                />
                <button className="btn btn-outline-secondary" type="button" id="copy-code"
                        onClick={() => copyToClipboard(value)}>
                    <Files/>
                </button>
            </div>
        </div>
    )
}

type Props = {
    value: string
    label: string
};

export default InputWithCopyButton;