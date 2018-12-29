import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { LoggerService } from '../logger.service';

@Injectable({
    providedIn: 'root'
})
export class JwtParserService {
    constructor(
        private log: LoggerService
    ) { }

    public parseTokenData(rawToken: string): Token {
        const data = JSON.parse(atob(rawToken.split('.')[1]));
        const token: Token = {
            username: data.username,
            expiration: moment.unix(data.exp).toDate(),
            issued: moment.unix(data.iat).toDate(),
            raw: rawToken
        };

        this.log.write('Parsed auth token:');
        this.log.write(token);

        return token;
    }
}

export type Token = {
    username: string;
    expiration: Date;
    issued: Date;
    raw: string;
};
