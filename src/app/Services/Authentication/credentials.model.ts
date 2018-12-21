
export class Credentials {
    public username: string;
    public password: string;
    public rememberMe: boolean;

    toJson(): Object {
        return {
            username: this.username,
            password: this.password
        };
    }
}
