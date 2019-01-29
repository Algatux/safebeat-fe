import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import {
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { SocialLoginModule} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../store/reducers/authentication.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AuthenticationEffects} from '../store/effects/authentication.effects';
import {DeviceDetectorModule} from 'ngx-device-detector';

export const moduleImports = [

    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
    }),

    DeviceDetectorModule.forRoot(),

    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    SocialLoginModule

];

