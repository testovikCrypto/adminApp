import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { ChangePriceComponent } from './pages/change-price/change-price.component';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ActualWalletsComponent } from './pages/actual-wallets/actual-wallets.component';
import {FilterPipe} from "./pipes/filter-pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AuthComponent } from './pages/auth/auth.component';
import { AuthNewComponent } from './pages/auth-new/auth-new.component';
import { UsersNewComponent } from './pages/users-new/users-new.component';
import { HeaderNewComponent } from './components/header-new/header-new.component';
import { WalletsNewComponent } from './pages/wallets-new/wallets-new.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        ChangePriceComponent,
        HeaderComponent,
        ActualWalletsComponent,
        FilterPipe,
        AuthComponent,
        AuthNewComponent,
        UsersNewComponent,
        HeaderNewComponent,
        WalletsNewComponent
    ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
