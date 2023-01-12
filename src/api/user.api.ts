import axios from "axios";
import { Game } from "model/game.model";
import { User } from "model/user.model";
import { UrlUtils } from "utils/url-utils";

export class UserApi {

    static getCurrentUser = async () => {
        const response = await axios.get(`${UrlUtils.API_V1}/user/current`);
        return response.data;
    };


    static createUser = async (): Promise<User> => {
        const response = await axios.post(`${UrlUtils.API_V1}/users`);
        return response.data;
    };

    //todo: without token
    static getUser = async (id: string): Promise<User> => {

        const response = await axios.get(`${ UrlUtils.API_V1 }/users/${id}`);
        return response.data;
    };
}

