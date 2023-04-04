import {useTranslation} from "react-i18next";
import {PlayerWithName} from "../../dto/player-with-name";
import PlayerIcon from "./payer-icon";
import {Award} from "react-bootstrap-icons";

function TeamResultsPanel({
                              players,
                              isCurrentUsersTeam,
                              guessedWords,
                              roundsPerTeam,
                              place
                          }: Props) {

    const {t} = useTranslation();

    const backgroundColor = isCurrentUsersTeam ? "bg-secondary bg-opacity-10" : ""

    return (
        <>
            <div className="text-start px-lg-2 px-1 lead"><Award color="gold"/>
                <b>{place} {t("gameFinished.results.teamPlace")}</b></div>
            <div
                className={`d-flex flex-column m-lg-2 mb-2 p-1 p-lg-2 rounded border border-opacity-50 border-secondary ${backgroundColor}`}>
                <div className="d-flex flex-row justify-content-between mb-2">
                    <div>{t("team.team")} {players[0].teamId + 1}</div>
                </div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column flex-grow-1">
                        {players.map(player => {
                            return (
                                <div key={`p${player.id}`} className="d-flex flex-row justify-content-left mb-2">
                                    <PlayerIcon playerStatus={player.status}/>
                                    <div className="align-self-center text-start ms-2" data-id={player.id}>
                                        {player.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="d-flex flex-row">
                    {t("gameFinished.results.teamResult")}:
                </div>
                <div className="d-flex flex-row">
                    <div className="pe-2"><small>{t("gameFinished.results.wordsGuessed")}:</small> {guessedWords} </div>
                    <div><small>{t("gameFinished.results.totalRounds")}:</small> {roundsPerTeam}</div>
                </div>
            </div>
        </>
    )

}

type Props = {
    players: PlayerWithName[],
    isCurrentUsersTeam: boolean,
    guessedWords: number,
    roundsPerTeam: number,
    place: number
};

export default TeamResultsPanel;