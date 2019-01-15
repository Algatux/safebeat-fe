
export class Credentials {
    public username: string;
    public password: string;
    public rememberMe?: boolean | null;

    toJson(): Object {
        return {
            username: this.username,
            password: this.password
        };
    }
}
