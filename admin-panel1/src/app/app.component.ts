import { Component } from '@angular/core';
import {RequestService} from "./services/request.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
  title = 'admin-crypto-shop';

  isLoggedIn = () => {
    return localStorage.getItem('token');
  }

}
