import axios from "axios";
import {UrlUtils} from "../utils/url-utils";
import {Explanation} from "../model/explanation.model";
import {UpdateExplanationData} from "../model/update-explanation-data.mode";
import {logInfo} from "../utils/logging.utils";

export class ExplanationApi {

    static getNextExplanation = async (gameId: string, roundId: number, data: UpdateExplanationData): Promise<Explanation> => {
        logInfo("ExplanationApi")
        const response = await axios.post(`${UrlUtils.API_V1}/games/${gameId}/rounds/${roundId}/next`, data);
        return response.data;
    };

}