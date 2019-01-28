import {Token} from './jwt-parser.service';

export const AUTH_TOKEN_KEY = 'authToken';
export const USER_TOKEN_DATA_KEY = 'userTokenData';

export class TokenStorageService {

    public static getToken(): Token | null {
        if (null === localStorage.getItem(AUTH_TOKEN_KEY)) {
            return null;
        }

        let token: string | Token | null = localStorage.getItem(USER_TOKEN_DATA_KEY);
        token = null !== token ? (JSON.parse(token) as Token) : null;

        if (null === token) {
            return null;
        }

        token.expiration = new Date(token.expiration);
        token.issued = new Date(token.issued);

        return token;
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

    static clear() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_TOKEN_DATA_KEY);
    }
}
