import {Button} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {CreateGameData} from "../../model/create-game-data.model";

type Props = {
    onFormSubmit: (data: CreateGameData) => void;
    loading: boolean
};

function CreateGameForm({ onFormSubmit, loading }: Props) {
    const minWordsPerPlayer = 1
    const maxWordsPerPlayer = 10
    const minMoveTime = 30
    const maxMoveTime = 120

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateGameData>({
        mode: "onBlur",
        defaultValues: { wordsPerPlayer: 10, moveTime: 30},
    });

    const { t } = useTranslation();
    const onSubmit: SubmitHandler<CreateGameData> = data => onFormSubmit(data);

    return (
        <div className="col-md-6 mx-auto">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <label>{ t("createGame.form.worldPerPlayer.label") }</label>
                <div className="input-group has-validation">
                    <input
                        type="number"
                        className={ "form-control " + (errors?.wordsPerPlayer ? "is-invalid" : "") }
                        {
                            ... register(
                                "wordsPerPlayer",
                                { required: true, min: minWordsPerPlayer, max: maxWordsPerPlayer, valueAsNumber: true },
                            )
                        }
                    />
                    { errors?.wordsPerPlayer?.type === "required" &&
                        <div className="invalid-feedback"> { t("error.requiredField") }</div> }
                    { errors?.wordsPerPlayer?.type === "min" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.minWordsPerPlayer", { min: minWordsPerPlayer }) }
                        </div>
                    }
                    { errors?.wordsPerPlayer?.type === "max" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.maxWordsPerPlayer", { max: maxWordsPerPlayer }) }
                        </div>
                    }
                </div>
                <label>{ t("createGame.form.moveTime.label") }</label>
                <div className="input-group has-validation">
                    <input
                        type="number"
                        className={ "form-control " + (errors?.moveTime ? "is-invalid" : "") }
                        { ... register(
                            "moveTime",
                            { required: true, min: minMoveTime, max: maxMoveTime, valueAsNumber: true },
                        ) }
                    />
                    { errors?.moveTime?.type === "required" &&
                        <div className="invalid-feedback">{ t("error.requiredField") }</div> }
                    { errors?.moveTime?.type === "min" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.minMoveTime", { min: minMoveTime }) }
                        </div>
                    }
                    { errors?.moveTime?.type === "max" &&
                        <div className="invalid-feedback">
                            { t("createGame.form.error.maxMoveTime", { max: maxMoveTime }) }
                        </div>
                    }

                </div>
                <div className="py-5 d-grid gap-5 mx-auto">
                    <Button type="submit" variant="primary" size="lg" disabled={ loading }>
                        { t("btn.create") }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateGameForm;
