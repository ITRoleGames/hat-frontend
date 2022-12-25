const TOKEN_LOCAL_STORAGE_ATTRIBUTE_NAME = "userToken";

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

