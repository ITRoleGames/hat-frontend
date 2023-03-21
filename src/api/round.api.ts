import axios from "axios";
import {UrlUtils} from "../utils/url-utils";
import {Round} from "model/round.model";
import {logError, logInfo} from "../utils/logging.utils";

export class RoundApi {

    static startRound = async (gameId: string): Promise<Round> => {
        const response = await axios.post(`${UrlUtils.API_V1}/games/${gameId}/rounds`);
        return response.data;

        // return Promise.resolve(
        //     {
        //         id: 1,
        //         explainerId: 1,
        //         newExplanation: {
        //             id: 1,
        //             wordId: 1,
        //             wordValue: "Perdak"
        //         },
        //         startTime: "now"
        //     } as Round,
        // );
    };

    static finishRound = async (gameId: string, roundId: number): Promise<void> => {
        return await axios.post(`${UrlUtils.API_V1}/games/${gameId}/rounds/${roundId}/finish`);
    };

    static getLatestRound = async (gameId: string): Promise<Round | undefined> => {
        const response = await axios.get(`${UrlUtils.API_V1}/games/${gameId}/rounds?limit=1&sort=desc`)

        logInfo(JSON.stringify(response.data))

        return response.data[0]

        // return Promise.resolve(
        //     {
        //         id: 1,
        //         explainerId: 1,
        //         newExplanation: {
        //             id: 1,
        //             wordId: 1,
        //             wordValue: "Perdak"
        //         },
        //         startTime: "now"
        //     } as Round,
        // );
    }
}