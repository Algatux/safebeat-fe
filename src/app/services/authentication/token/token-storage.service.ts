import {Token} from '../model/auth-token.model';

export const AUTH_TOKEN_KEY = 'authToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const USER_TOKEN_DATA_KEY = 'userTokenData';

export class TokenStorageService {

    public static getToken(): Token | null {

        const rawToken: string | null = localStorage.getItem(AUTH_TOKEN_KEY);

        return null !== rawToken ? new Token(rawToken) : null;
    }

    static storeToken(token: Token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token.authToken);
        localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(
            {
                username: token.username,
                expiration: token.expiration,
                issued: token.issued
            }
        ));
    }

    static storeRefreshToken(token: string) {
        localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, token);
    }

    static getRefreshToken(): string | null {

        return localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
    }

    static clear(refreshToken: boolean) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_TOKEN_DATA_KEY);

        if (refreshToken) {
            localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        }
    }

}
