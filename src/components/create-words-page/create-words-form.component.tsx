import WordValues from "components/create-words-page/wordValues";
import { Button } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CreateWordsFormProps = {
    onFormSubmit: (data: WordValues) => void;
    loading: boolean
};

const CreateWordsForm = ({ onFormSubmit, loading }: CreateWordsFormProps) => {
    const { t } = useTranslation();

    const methods = useForm<WordValues>({
        mode: "onBlur",
        defaultValues: { words: [] },
    });

    const { control, register, handleSubmit, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<WordValues> = data => onFormSubmit(data);

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            {
                Array.from({ length: 2 }).map((_, index: number) => {

                    return (
                        <div className="input-group has-validation" key={ index }>
                            <input
                                className={ "form-control " + (errors.words && errors.words[index] ? "is-invalid" : "") }
                                key={ index }
                                { ... register(`words.${ index }.value`, { required: true }) }
                                placeholder="word"
                                type="text"
                            />

                            { (errors.words && errors.words[index]?.value?.type === "required") &&
                                <div className="invalid-feedback"> { t("error.requiredField") }</div> }

                        </div>
                    );

                })
            }
            <Button type="submit" variant="primary" size="lg" disabled={ loading }>
                { t("btn.next") }
            </Button>
        </form>
    );
};

export default CreateWordsForm;
