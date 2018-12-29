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
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../Services/Authentication/authentication.reducer';

export class ModuleImports {
    public static imports(): Array<any> {

        return [
            AppRoutingModule,
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            FormsModule,

            StoreModule.forRoot({ auth: authReducer }),

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
    }
}
