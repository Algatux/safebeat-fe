import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../Services/logger.service';

interface Configuration {
    appBaseUrl: string;
}

enum ConfUrl {
    configFile = 'assets/config.json'
}

@Injectable({
    providedIn: 'root'
  })
export class ConfigurationService {

    private config: Configuration | null;

    constructor(
        private http: HttpClient,
        private log: LoggerService
    ) {
        this.fetchConfiguration();
    }

    private fetchConfiguration() {
        return this.http.get<Configuration>(ConfUrl.configFile)
            .subscribe(
                (data: Configuration) => {
                    this.config = { ... data };
                    this.log.write(`config data loaded ${JSON.stringify(this.config)}`);
                },
                error => { this.log.write(error.error.message); },
                () => { this.log.write('configuration loading complete'); }
            );
    }

    getConfiguration(): Configuration | null {
        return this.config;
    }
}
