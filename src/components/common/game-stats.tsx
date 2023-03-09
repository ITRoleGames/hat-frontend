import {useTranslation} from "react-i18next";

function GameStats({wordsCount}: Props) {

    const {t} = useTranslation();

    return (
        <div className="text-start p-2">{t("game.wordsCount")}: {wordsCount}</div>
    )
}

type Props = {
    wordsCount: number
};

export default GameStats;