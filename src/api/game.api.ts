import axios from "axios";
import { CreateGameData } from "model/create-game-data.model";
import { Game } from "model/game.model";
import { UrlUtils } from "utils/url-utils";
import {GameReport} from "../model/game-report.model";

export class GameApi {

    static createGame = async (createGameData: CreateGameData): Promise<Game> => {

        const response = await axios.post(`${ UrlUtils.API_V1 }/games`, createGameData);
        return response.data;
    };

    static joinGame = async (code: string, userId: string): Promise<Game> => {

        const data = {
            code: code,
            userId: userId,
        };

        const response = await axios.post(`${ UrlUtils.API_V1 }/game/join`, data);
        return response.data;
    };

    static getGame = async (id: string): Promise<Game> => {

        const response = await axios.get(`${ UrlUtils.API_V1 }/games/${id}`);
        return response.data;
    };

    static startGame = async (id: string): Promise<Game> => {

        const response = await axios.post(`${ UrlUtils.API_V1 }/games/${id}/startGame`);
        return response.data;
    };


    static getReport = async(id: string): Promise<GameReport> =>{

        const response = await axios.post(`${ UrlUtils.API_V1 }/games/${id}/report`);
        return response.data;

    }

}


