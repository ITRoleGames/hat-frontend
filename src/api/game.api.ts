import axios from "axios";
import { CreateGameData } from "model/create-game-data.model";
import { Game } from "model/game.model";

export class GameApi {

    static createGame = async (createGameData: CreateGameData): Promise<Game> => {

        const response = await axios.post("/api/game", createGameData);
        return response.data;

        // await new Promise(f => setTimeout(f, 1000));

        // return Promise.resolve(
        //     {
        //         id: "1",
        //         code: "qwerty123",
        //         creatorId: createGameData.creatorId,
        //         wordsPerParticipant: createGameData.wordsPerParticipant,
        //         moveTimeInSec: createGameData.moveTime,
        //     } as Game,
        // );
    };

    static joinGame = async (code: string, userId: string): Promise<Game> => {

        const data = {
            code: code,
            userId: userId,
        };

        const response = await axios.post("/api/game/join", data);
        return response.data;

        // await new Promise(f => setTimeout(f, 1000));
        //
        // return Promise.resolve(
        //     {
        //         id: "1",
        //         code: "qwerty123",
        //         creatorId: "1",
        //         wordsPerParticipant: 10,
        //         moveTimeInSec: 30,
        //     } as Game,
        // );
    };

}


