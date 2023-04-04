import {useTranslation} from "react-i18next";
import {GameReport} from "../../model/game-report.model";
import TeamResultsList from "./team-results-list.components";
import {Game} from "../../model/game.model";
import {User} from "../../model/user.model";

function GameResults({game,currentUser,gameUsers,gameReport}: Props) {

    const {t} = useTranslation();

    const totalRounds = gameReport.teamStats.map(ts => ts.roundsCount)
        .reduce((sum, current) => sum + current);

    return (
        <div className="row px-2">
            <div className="col-12 text-start"><h5>{t("gameFinished.results.title")}</h5></div>
            <div className="col-12 text-start mx-lg-2">{t("gameFinished.results.wordsGuessed")}: {gameReport.wordsGuessed}</div>
            <div className="col-12 text-start mx-lg-2">{t("gameFinished.results.totalTime")}: {gameReport.wordsGuessed}</div>
            <div className="col-12 text-start mx-lg-2">{t("gameFinished.results.totalRounds")}: {totalRounds}</div>
            <div className="col-12 text-start mt-3"><h5>{t("gameFinished.results.teamsRating")}</h5></div>
            <TeamResultsList game={game} currentUser={currentUser} gameUsers={gameUsers} gameReport={gameReport}/>
        </div>
    )
}

type Props = {
    game: Game,
    currentUser: User,
    gameUsers: User[],
    gameReport: GameReport
};

export default GameResults;