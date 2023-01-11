import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {Game} from "../../model/game.model";
import WordValues from "./add-words-form-data";

type Props = {
    onFormSubmit: (data: WordValues) => void;
    game: Game
    loading: boolean
};

function AddWordsForm({onFormSubmit, game, loading}: Props) {

    const {t} = useTranslation();

    const methods = useForm<WordValues>({
        mode: "onBlur",
        defaultValues: { words: [] },
    });

    const {register, control, handleSubmit, formState: {errors}} = methods;

    const onSubmit: SubmitHandler<WordValues> = data => onFormSubmit(data);

    return (
        <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="d-inline-block">
                {
                    Array.from({length: game.wordsPerPlayer}).map((_, index: number) => {
                        return (
                            <div className="input-group has-validation" key={index}>
                                <input
                                    className={"form-control " + (errors.words && errors.words[index] ? "is-invalid" : "")}
                                    key={index}
                                    {...register(`words.${index}.value`, {required: true})}
                                    placeholder="word"
                                    type="text"
                                />

                                {(errors.words && errors.words[index]?.value?.type === "required") &&
                                    <div className="invalid-feedback"> {t("error.requiredField")}</div>}

                            </div>
                        );
                    })
                }
                <div className="py-5 d-grid gap-5 mx-auto">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}>
                        {t("btd.words.add")}
                    </Button>
                </div>
            </form>
        </div>
    );

}

export default AddWordsForm