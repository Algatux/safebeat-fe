import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModuleImports } from './Configuration/module-imports';
import { ComponentDeclaration } from './Configuration/component-declaration';

@NgModule({
  declarations: ComponentDeclaration.declare(),
  imports: ModuleImports.imports(),
  providers: [],
  bootstrap: [AppComponent]
})
export class SafebeatAppModule { }
