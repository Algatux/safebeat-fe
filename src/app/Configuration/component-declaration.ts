
import { AppComponent } from '../app.component';
import { SidenavComponent } from '../Components/shared/sidenav/sidenav.component';
import { LoginBoxComponent } from '../Components/login-box/login-box.component';
import { HomeComponent } from '../Components/home/home.component';

export class ComponentDeclaration {
    public static declare(): Array<any> {

        return [
            AppComponent,
            HomeComponent,
            SidenavComponent,
            LoginBoxComponent,
        ];
    }
}
