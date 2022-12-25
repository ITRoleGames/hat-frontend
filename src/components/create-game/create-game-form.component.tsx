import { FormData } from "components/create-game/create-game-form-data";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
    onFormSubmit: (data: FormData) => void;
    loading: boolean
};

function CreateGameForm({ onFormSubmit, loading }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: { wordsPerParticipant: 10, moveTime: 30 },
    });

    const { t } = useTranslation();
    const onSubmit: SubmitHandler<FormData> = data => onFormSubmit(data);

    return (
        <div className="col-md-6 mx-auto">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <label>{ t("createGame.form.worldPerPlayer.label") }</label>
                <div className="input-group has-validation">
                    <input
                        type="number"
                        className={ "form-control " + (errors?.wordsPerParticipant ? "is-invalid" : "") }
                        { ... register("wordsPerParticipant", { required: true, max: 10 }) }
                    />
                    { errors?.wordsPerParticipant?.type === "required" &&
                        <div className="invalid-feedback"> { t("error.requiredField") }</div> }
                    { errors?.wordsPerParticipant?.type === "max" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.maxPlayers", { max: 10 }) }
                        </div>
                    }
                </div>
                <label>{ t("createGame.form.moveTime.label") }</label>
                <div className="input-group has-validation">
                    <input
                        type="number"
                        className={ "form-control " + (errors?.moveTime ? "is-invalid" : "") }
                        { ... register("moveTime", { required: true, max: 120 }) }
                    />
                    { errors?.moveTime?.type === "required" &&
                        <div className="invalid-feedback">{ t("error.requiredField") }</div> }
                    { errors?.moveTime?.type === "max" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.maxTime", { max: 120 }) }
                        </div>
                    }

                </div>
                <div className="py-5 d-grid gap-5 mx-auto">
                    <Button type="submit" variant="primary" size="lg"
                            disabled={ loading }> { t("btn.create") }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateGameForm;
