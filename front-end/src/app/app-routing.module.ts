import { TitlePageComponent } from './title-page/title-page.component';
import { AppComponent } from './app.component';
import { StorageComponent } from './storage/storage.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewLoginComponent } from './new-login/new-login.component';
import { IsLoggedService } from './is-logged.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
 {path: 'storage', component: StorageComponent, canActivate: [IsLoggedService]},
  {path: 'create', component: NewLoginComponent, canActivate: [IsLoggedService]},
  {path: 'auth', component: TitlePageComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
