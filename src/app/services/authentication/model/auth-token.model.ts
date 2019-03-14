import * as moment from 'moment';

export class Token {

    username: string;
    expiration: Date;
    issued: Date;
    authToken: string;

    constructor(rawToken: string) {

        this.authToken = rawToken;

        const data = JSON.parse(atob(rawToken.split('.')[1]));

        this.username = data.username;
        this.expiration = moment.unix(data.exp).toDate();
        this.issued = moment.unix(data.iat).toDate();
    }

    isExpired(): boolean {

        return this.expiration <= new Date();
    }

}
