import {useTranslation} from "react-i18next";
import {Files} from "react-bootstrap-icons";
import {Store} from "react-notifications-component";

function InputWithCopyButton({value, label}: Props) {

    const {t} = useTranslation();

    const copyCodeAndNotify = async (text: string) => {
        await copyToClipboard(text)
            .then(() => notifyCopied())
            .catch(_ => notifyError())
    }

    const copyToClipboard = async (text: string) => {
        return new Promise((resolve, reject) => {
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                const textarea = document.createElement("textarea");
                textarea.textContent = text;
                textarea.style.position = "fixed";
                textarea.style.width = "2em";
                textarea.style.height = "2em";
                textarea.style.padding = "0";
                textarea.style.border = "none";
                textarea.style.outline = "none";
                textarea.style.boxShadow = "none";
                textarea.style.background = "transparent";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    resolve("");
                } catch (e) {
                    document.body.removeChild(textarea);
                    reject(e);
                }
            } else {
                reject(new Error("None of copying methods are supported by this browser!"));
            }
        });
    }

    const notifyCopied = () => {
        Store.addNotification({
            message: t("codeCopiedToClipboard"),
            type: "info",
            insert: "top",
            container: "top-full",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true,
            },
        });
    }

    const notifyError = () => {
        Store.addNotification({
            message: t("codeCopyError"),
            type: "danger",
            insert: "top",
            container: "top-full",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
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
                        onClick={() => copyCodeAndNotify(value)}>
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