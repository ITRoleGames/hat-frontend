import axios from "axios";
import {AddWordsData} from "model/add-words-data.model";
import {UrlUtils} from "utils/url-utils";

export class WordApi {

    static addWords = async (addWordsData: AddWordsData): Promise<void> => {

        return Promise.resolve()
        //todo: uncomment once implemented
        // await axios.post(`${UrlUtils.API_V1}/games/${addWordsData.gameId}/words`, addWordsData);
    };

}


