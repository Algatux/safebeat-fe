import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
