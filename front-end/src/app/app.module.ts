import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { StorageComponent } from './storage/storage.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal/modal.component';
import { PromptDeleteComponent } from './modal/prompt-delete/prompt-delete.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { RegistrationComponent } from './modal/registration/registration.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { BurgerModalComponent } from './modal/burger-modal/burger-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResponseSearchComponent } from './modal/response-search/response-search.component';
import { DeleteAccountComponent } from './modal/delete-account/delete-account.component';
import { ChangeLogoComponent } from './modal/change-logo/change-logo.component';
import { TutorialComponent } from './modal/tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    StorageComponent,
    MenuItemComponent,
    NewLoginComponent,
    ModalComponent,
    PromptDeleteComponent,
    InfiniteScrollComponent,
    TitlePageComponent,
    RegistrationComponent,
    NotFoundPageComponent,
    BurgerModalComponent,
    ResponseSearchComponent,
    DeleteAccountComponent,
    ChangeLogoComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
