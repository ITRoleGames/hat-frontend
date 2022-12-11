import axios from "axios";
import { User } from "model/user.model";

export class UserApi {

    static getCurrentUser = async () => {
        const response = await axios.get("/api/user/current");
        return response.data;
    };


    static createUser = async (): Promise<User> => {
        const response = await axios.post('/api/user');
        return response.data;
        // // console.log("Creating user...");
        // await new Promise(f => setTimeout(f, 1000));
        //
        // let random = Math.random() * 1000
        // const name = `Random Name ${random}`;
        //
        // const result = Promise.resolve(
        //     {
        //         id: "1",
        //         name: name,
        //     },
        // );
        //
        // return result;
    };
}

