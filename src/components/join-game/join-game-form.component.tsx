import { JoinGameFormData } from "components/join-game/join-game-form-data";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";

type Props = {
    onFormSubmit: (data: JoinGameFormData) => void;
    loading: boolean
};

function JoinGameForm({ onFormSubmit, loading }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JoinGameFormData>();

    const onSubmit: SubmitHandler<JoinGameFormData> = data => onFormSubmit(data);

    return (
        <div className="col-md-6 mx-auto">
            <form onSubmit={ handleSubmit(onSubmit) }>
                <label>Код игры</label>
                <div className="input-group has-validation">
                    <input
                        className={ "form-control " + (errors?.code ? "is-invalid" : "") }
                        { ... register("code", { required: true }) }
                    />
                    { errors?.code?.type === "required" &&
                        <div className="invalid-feedback">Обязательное поле</div> }
                </div>
                <div className="py-5 d-grid gap-5 mx-auto">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}> Присоединиться </Button>
                </div>
            </form>
        </div>
    );
}

export default JoinGameForm;
