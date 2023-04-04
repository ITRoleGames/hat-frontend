const TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME = "userToken";
const GAME_ID = "gameId";
const LANG = "lang";

export function isUserLoggedIn(): boolean {

    return !!localStorage.getItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME);
}

export function getAccessToken(): string | null {

    return localStorage.getItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME);
}


export function setLang(lang: string): void {

    return localStorage.setItem(LANG, lang);
}

export function getLang(): string {
    const storedLang = localStorage.getItem(LANG);

    return storedLang != null ? storedLang : "ru";
}


export function registerAccessToken(token: string): void {

    localStorage.setItem(TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME, token);
}

export function getGameIdFromLocalStorage(): string | null {

    return localStorage.getItem(GAME_ID);
}

export function registerGameIdInLocalStorage(gameId: string): void {

    localStorage.setItem(GAME_ID, gameId);
}

export function clearGameIdInLocalStorage(): void {
    localStorage.removeItem(GAME_ID)
}