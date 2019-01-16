
import { environment } from 'src/environments/environment';

interface Configuration {
    appBaseUrl: string;
}

export class ConfigurationService {

    static getConfiguration(): Configuration {
        return {
            appBaseUrl: environment.appBaseUrl
        };
    }
}
