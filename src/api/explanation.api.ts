import axios from "axios";
import {UrlUtils} from "../utils/url-utils";
import {Explanation} from "../model/explanation.model";
import {UpdateExplanationData} from "../model/update-explanation-data.mode";

export class ExplanationApi {

    static getNextExplanation = async (gameId: string, roundId: number, data: UpdateExplanationData): Promise<Explanation> => {
        const response = await axios.post(
            `${UrlUtils.API_V1}/games/${gameId}/rounds/${roundId}/finishCurrentAndStartNewExplanation`,
            data
        );
        return response.data;
    };

}