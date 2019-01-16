import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Logger } from '../logger.service';

@Injectable({
    providedIn: 'root'
})
export class JwtParserService {
    constructor() { }

    public static parseTokenData(rawToken: string): Token {
        const data = JSON.parse(atob(rawToken.split('.')[1]));
        const token: Token = {
            username: data.username,
            expiration: moment.unix(data.exp).toDate(),
            issued: moment.unix(data.iat).toDate(),
            authToken: rawToken
        };

        Logger.write('Parsed auth token:');
        Logger.write(token);

        return token;
    }
}

export type Token = {
    username: string;
    expiration: Date;
    issued: Date;
    authToken: string;
};
