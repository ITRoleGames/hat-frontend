import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {formatSeconds} from "../../service/time.utils";

function GameStats({wordsCount, wordsGuessed = 0, totalTime = 0}: Props) {

    const {t} = useTranslation();
    const refTimer = useRef<number | null>(null);
    const [count, setCount] = useState(totalTime);

    const startInterval = () => {
        if (refTimer.current !== null) return;
        refTimer.current = window.setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);
    };

    useEffect(() => {
        setCount(totalTime);
        startInterval()
    }, [totalTime])

    return (
        <div className="row px-2">
            <div className="text-start col-6">{t("game.wordsCount")}: {wordsCount - wordsGuessed}</div>
            <div className="text-end col-6">{totalTime != 0 && formatSeconds(count)}</div>
        </div>
    )
}

type Props = {
    wordsCount: number
    wordsGuessed: number | undefined
    totalTime: number | undefined
};

export default GameStats;