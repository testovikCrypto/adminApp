import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {ChangePriceComponent} from "./pages/change-price/change-price.component";
import {ActualWalletsComponent} from "./pages/actual-wallets/actual-wallets.component";
import {UsersNewComponent} from "./pages/users-new/users-new.component";
import {WalletsNewComponent} from "./pages/wallets-new/wallets-new.component";

const routes: Routes = [
  {
    path: '',
    component: UsersNewComponent, //UsersComponent
  },
  {
    path: 'change-price',
    component: ChangePriceComponent
  },
  {
    path: 'wallets-new',
    component: WalletsNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

