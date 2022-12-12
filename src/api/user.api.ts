import axios from "axios";
import { User } from "model/user.model";

export class UserApi {

    static getCurrentUser = async () => {
        const response = await axios.get("/api/users/current");
        return response.data;
    };


    static createUser = async (): Promise<User> => {
        const response = await axios.post('/api/users');
        return response.data;
    };
}

