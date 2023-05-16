import axios from "axios";
import {UrlUtils} from "../utils/url-utils";
import {Round} from "model/round.model";

export class RoundApi {

    static startRound = async (gameId: string): Promise<Round> => {
        const response = await axios.post(`${UrlUtils.API_V1}/games/${gameId}/rounds`);
        return response.data;
    };

    static finishRound = async (gameId: string, roundId: number): Promise<void> => {
        return await axios.post(`${UrlUtils.API_V1}/games/${gameId}/rounds/${roundId}/finish`);
    };

    static getLatestRound = async (gameId: string): Promise<Round | undefined> => {
        const response = await axios.get(`${UrlUtils.API_V1}/games/${gameId}/rounds?limit=1&sort=DESC`)
        return response.data[0]
    }
}
