import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Configuration {
    appBaseUrl: string;
}

@Injectable({
    providedIn: 'root'
  })
export class ConfigurationService {

    constructor() {}

    getConfiguration(): Configuration {
        return {
            appBaseUrl: environment.appBaseUrl
        };
    }
}
