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

export class ModuleImports {
    public static imports(): Array<any> {

        return [
            AppRoutingModule,
            BrowserModule,
            BrowserAnimationsModule,
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
