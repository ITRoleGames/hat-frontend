import {useTranslation} from "react-i18next";
import {PlayerWithName} from "../../dto/player-with-name";
import PlayerIcon from "./payer-icon";
import {Button} from "react-bootstrap";

function TeamPanel({currentUserId, players, wordsCount, isCurrentUsersTeam, isTeamPlaying, roundTime}: Props) {

    const {t} = useTranslation();

    return (
        <>
            <div className="d-flex flex-column m-2 p-2 bg-light rounded">
                <div className="d-flex flex-row justify-content-between mb-2">
                    <div>{t("team.team")} 1</div>
                    <div className="flex-grow-1 text-start">
                        {isCurrentUsersTeam && <small className="text-primary">{t("team.yourTeam")}</small>}
                    </div>
                    <div>{t("team.wordsCount")}</div>
                </div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column flex-grow-1">
                        {players.map(player => {
                            return (
                                <div key={player.id} className="d-flex flex-row justify-content-left mb-2">
                                    <PlayerIcon playerStatus={player.status}/>
                                    <div className="align-self-center text-start ms-2">
                                        {player.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex p-4 align-self-center">
                        {wordsCount > 0 ? wordsCount : "---"}
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-column flex-grow-1">
                    <span className="text-danger fs-1">
                       00:{roundTime}
                    </span>
                    </div>
                </div>
            </div>
            {
                isTeamPlaying && <Button variant="primary" size="lg" onClick={() => {
                    alert("Not impl");
                }}>
                    {t("btn.startRound")}
                </Button>
            }
        </>
    )
}

type Props = {
    currentUserId: string,
    players: PlayerWithName[],
    wordsCount: number,
    isCurrentUsersTeam: boolean
    isTeamPlaying: boolean
    roundTime: number
};

export default TeamPanel;