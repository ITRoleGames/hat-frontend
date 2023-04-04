import axios from "axios";
import {CreateGameData} from "model/create-game-data.model";
import {Game} from "model/game.model";
import {UrlUtils} from "utils/url-utils";
import {GameReport} from "../model/game-report.model";
import {PlayerRef} from "../model/player-ref.model";

export class GameApi {

    static createGame = async (createGameData: CreateGameData): Promise<Game> => {

        const response = await axios.post(`${UrlUtils.API_V1}/games`, createGameData);
        return response.data;
    };

    static joinGame = async (code: string, userId: string): Promise<Game> => {

        const data = {
            code: code,
            userId: userId,
        };

        const response = await axios.post(`${UrlUtils.API_V1}/game/join`, data);
        return response.data;
    };

    static getGame = async (id: string): Promise<Game> => {

        const response = await axios.get(`${UrlUtils.API_V1}/games/${id}`);
        return response.data;
    };

    static startGame = async (id: string): Promise<Game> => {

        const response = await axios.post(`${UrlUtils.API_V1}/games/${id}/startGame`);
        return response.data;
    };


    static getGameReport = async (id: string): Promise<GameReport> => {

        // const response = await axios.post(`${ UrlUtils.API_V1 }/games/${id}/report`);
        // return response.data;

        return Promise.resolve(
            {
                wordsGuessed: 1,
                totalTime: 5240,
                teamStats: [
                    {
                        players: [{internalId: 57} as PlayerRef],
                        wordsGuessed: 4,
                        roundsCount: 22
                    },

                    {
                        players: [{internalId: 60} as PlayerRef],
                        wordsGuessed: 2,
                        roundsCount: 22
                    },
                    {
                        players: [{internalId: 61} as PlayerRef],
                        wordsGuessed: 3,
                        roundsCount: 22
                    }
                ]
            } as GameReport
        )
    }

}


