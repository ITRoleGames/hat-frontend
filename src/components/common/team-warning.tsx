import {useTranslation} from "react-i18next";
import {Game} from "../../model/game.model";
import WarningMessage from "./warning-message.component";
import {Player} from "../../model/player.model";
import {RoundStatus} from "../../model/round-status";

function TeamWarning({game, currentUserId, currentRoundStatus, isCurrentUsersTeam, isTeamPlayingNext}: Props) {

    const {t} = useTranslation();

    const isCurrentUserMove = (game: Game, currentUserId: string): boolean => {
        return game.players.find((player: Player) => player.userId == currentUserId)?.moveOrder == 0
    }

    return (
        <>
            {isCurrentUsersTeam && isTeamPlayingNext && currentRoundStatus != RoundStatus.STARTED &&
                <>
                    {isCurrentUserMove(game, currentUserId) && <WarningMessage message={t("game.youTurnToExplain")}/>}
                    {!isCurrentUserMove(game, currentUserId) && <WarningMessage message={t("game.youTurnToGuess")}/>}
                </>
            }
        </>
    )
}

type Props = {
    game: Game,
    currentUserId: string,
    currentRoundStatus: RoundStatus | undefined,
    isCurrentUsersTeam: boolean
    isTeamPlayingNext: boolean
};

export default TeamWarning;