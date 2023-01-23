function WarningMessage({message}: Props) {

    return (
        <div className="text-center text-danger">{message}</div>
    )
}

type Props = {
    message: string
};

export default WarningMessage;