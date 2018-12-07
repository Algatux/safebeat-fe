
import { AppComponent } from '../app.component';
import { SidenavComponent } from '../Components/sidenav/sidenav.component';
import { LoginBoxComponent } from '../Components/login-box/login-box.component';

export class ComponentDeclaration {
    public static declare(): Array<any> {

        return [
            AppComponent,
            SidenavComponent,
            LoginBoxComponent,
        ];
    }
}
