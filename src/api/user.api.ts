import axios from "axios";
import {User} from "model/user.model";
import {UrlUtils} from "utils/url-utils";
import {GetUsersResponse} from "../dto/get-users-response";

export class UserApi {

    static getCurrentUser = async () => {
        const response = await axios.get(`${UrlUtils.API_V1}/user/current`);
        return response.data;
    };


    static createUser = async (): Promise<User> => {
        const response = await axios.post(`${UrlUtils.API_V1}/users`);
        return response.data;
    };

    static getUsers = async (ids: string[]): Promise<GetUsersResponse> => {
        const response = await axios.get(`${ UrlUtils.API_V1 }/users?ids=${ids.join(",")}`);
        return response.data;
    };
}

