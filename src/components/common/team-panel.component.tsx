import {useTranslation} from "react-i18next";
import {PlayerWithName} from "../../dto/player-with-name";
import PlayerIcon from "./payer-icon";
import {Button} from "react-bootstrap";

function TeamPanel({currentUserId, players, wordsCount, isCurrentUsersTeam, isTeamPlaying, roundTime}: Props) {

    const {t} = useTranslation();
    const backgroundColor = isTeamPlaying ? "bg-secondary bg-opacity-10" : ""
    return (
        <>
            <div className={`d-flex flex-column m-lg-2 p-1 p-lg-2 rounded border border-opacity-50 border-secondary ${backgroundColor}`}>
                <div className="d-flex flex-row justify-content-between mb-2">
                    <div>{t("team.team")} {players[0].teamId +1}</div>
                    <div className="flex-grow-1 text-start">
                        {isCurrentUsersTeam &&  <small className="text-primary">&nbsp;{t("team.yourTeam")}</small>}
                        {(!isCurrentUsersTeam && isTeamPlaying) &&
                            <small className="text-danger">&nbsp;{t("team.playing")}</small>
                        }
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
                                        {
                                            currentUserId == player.userId &&
                                            <small className="text-primary">
                                               &nbsp; {t("team.itIsYou")}
                                            </small>
                                        }
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex p-4 align-self-center">
                        {wordsCount > 0 ? wordsCount : "---"}
                    </div>
                </div>
                {isTeamPlaying &&
                    <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-column flex-grow-1">
                    <span className="text-danger fs-1">
                       00:{roundTime}
                    </span>
                        </div>
                    </div>
                }
            </div>
            {
                (isCurrentUsersTeam && isTeamPlaying) && <Button variant="primary" size="lg" onClick={() => {
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