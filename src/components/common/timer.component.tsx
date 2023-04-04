import {useEffect, useRef, useState} from "react";

function RoundTimer({seconds, onComplete}: Props) {

    const [count, setCount] = useState(seconds);

    const [callbackSent, setCallbackSent] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const startInterval = () => {
        if (intervalRef.current !== null) return;
        intervalRef.current = window.setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            setCount(0);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (count <= 0) {
            return () => {
                if (intervalRef.current !== null) {
                    window.clearInterval(intervalRef.current);
                }
            };
        }
    }, [])

    if (count > 0) {
        startInterval()
    }

    if (count <= 0) {
        stopInterval()
        if (!callbackSent) {
            setCallbackSent(true)
            onComplete()
        }
    }

    return (
        <span className="text-danger fs-1">
            <span>00:{count > 9 ? count : `0${count}`}</span>
        </span>
    )
}

type Props = {
    seconds: number,
    onComplete: () => any
};

export default RoundTimer;