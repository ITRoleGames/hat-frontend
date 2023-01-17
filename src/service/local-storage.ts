const TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME = "userToken";
const GAME_ID = "gameId";

export function isUserLoggedIn(): boolean {

    if (localStorage.getItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME)) {
        return true;
    }

    return false;
}

export function getAccessToken(): string | null {

    return localStorage.getItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME);
}

export function registerAccessToken(token: string): void {
    
    localStorage.setItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME, token);
}

export function getGameId(): string | null {

    return localStorage.getItem(GAME_ID);
}

export function registerGameId(gameId: string): void {

    localStorage.setItem(GAME_ID, gameId);
}