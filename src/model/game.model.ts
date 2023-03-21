import {Player} from "./player.model";
import {GameStatus} from "./game-status";

export interface Game {

    /**
     * ID игры
     */
    id: string;

    /**
     * Код для подключения к игре
     */
    code: string;

    /**
     * ID создателя игры
     */
    creatorId: string;

    /**
     * Количество слов от каждого участника
     */
    wordsPerPlayer: number;

    /**
     * Время хода в секундах
     */
    moveTime: number;

    /**
     * Игроки
     */
    players: Player[];

    /**
     * Общее количество слов в шапке
     */
    wordsCount: number;

    /**
     * Статус игры
     */
    status: GameStatus;
}
