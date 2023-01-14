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
    moveTimeInSec: number;

    /**
     * Игроки
     */
    users: string[];
}
