import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { componentDeclarations, moduleImports } from './Configuration';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const authConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('970526898552-s62qmk8teifj1poo11m7s1glhcolkgdh.apps.googleusercontent.com')
  }
]);

@NgModule({
  declarations: [ ...componentDeclarations ],
  imports: [ ...moduleImports ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: () => authConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class SafebeatAppModule { }
