import Countdown, {CountdownRenderProps} from "react-countdown";

function RoundTimer({roundStart, moveTimeInSec, onComplete}: Props) {

    const roundEnd = new Date(roundStart);
    roundEnd.setSeconds(roundEnd.getSeconds() + moveTimeInSec)

    const renderer = (props: CountdownRenderProps) => {
        if (props.completed) {
            onComplete()
        } else {
            // Render a countdown
            return <span>00:{props.seconds}</span>
        }
    };

    return (
        <span className="text-danger fs-1">
            <Countdown
                date={roundEnd}
                precision={1}
                renderer={renderer}
            />
        </span>
    )
}

type Props = {
    roundStart: Date,
    moveTimeInSec: number,
    onComplete: () => any
};

export default RoundTimer;