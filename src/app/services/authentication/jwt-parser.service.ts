
import * as moment from 'moment';

export class JwtParserService {

    public static parseTokenData(rawToken: string): Token {
        const data = JSON.parse(atob(rawToken.split('.')[1]));

        return {
            username: data.username,
            expiration: moment.unix(data.exp).toDate(),
            issued: moment.unix(data.iat).toDate(),
            authToken: rawToken
        };
    }
}

export type Token = {
    username: string;
    expiration: Date;
    issued: Date;
    authToken: string;
};
