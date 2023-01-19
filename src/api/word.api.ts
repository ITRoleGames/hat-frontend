import {AddWordsData} from "model/add-words-data.model";

export class WordApi {

    static addWords = async (addWordsData: AddWordsData): Promise<void> => {

        return Promise.resolve()
        //todo: uncomment once implemented
        // await axios.post(`${UrlUtils.API_V1}/games/${addWordsData.gameId}/words`, addWordsData);
    };

}


