import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { componentDeclarations, moduleImports } from './configuration';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import {SecurityApi} from './services/api/security.api';
import {WalletApi} from './services/api/wallet.api';
import {AutoAuthenticationService} from './services/authentication/auto-authentication/auto-authentication.service';

const authConfig = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('970526898552-s62qmk8teifj1poo11m7s1glhcolkgdh.apps.googleusercontent.com')
  // }
]);

@NgModule({
  declarations: [ ...componentDeclarations ],
  imports: [ ...moduleImports ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => authConfig
    },
    AutoAuthenticationService,
    SecurityApi,
    WalletApi,
  ],
  bootstrap: [AppComponent]
})
export class SafebeatAppModule { }
