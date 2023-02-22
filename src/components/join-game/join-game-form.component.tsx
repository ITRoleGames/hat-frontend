import {JoinGameFormData} from "components/join-game/join-game-form-data";
import {Button} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";

type Props = {
    onFormSubmit: (data: JoinGameFormData) => void;
    loading: boolean
};

function JoinGameForm({onFormSubmit, loading}: Props) {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<JoinGameFormData>({
        defaultValues: {code: code || ""}
    })
    const {t} = useTranslation();

    const onSubmit: SubmitHandler<JoinGameFormData> = data => onFormSubmit(data);

    return (
        <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>{t("joinGame.form.code")}</label>
                <div className="input-group has-validation">
                    <input
                        className={"form-control " + (errors?.code ? "is-invalid" : "")}
                        {...register("code", {required: true})}
                    />
                    {errors?.code?.type === "required" &&
                        <div className="invalid-feedback">{t("error.requiredField")}</div>}
                </div>
                <div className="py-5 d-grid gap-5 mx-auto">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}> {t("btn.join")} </Button>
                </div>
            </form>
        </div>
    );
}

export default JoinGameForm;
