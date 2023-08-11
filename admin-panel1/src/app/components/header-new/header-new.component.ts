import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.scss']
})
export class HeaderNewComponent implements OnInit {

  constructor(private oRouter: Router) {
  }

  ngOnInit(): void {
  }

  getsActiveTab = () => {
    let sActiveTab_Return: string = '';
    let sCurrentPathName = window.location.pathname;
    if (sCurrentPathName.indexOf('change-price') !== -1) {
      sActiveTab_Return = 'change-price'
    } else if (sCurrentPathName.indexOf('wallets-new') !== -1) {
      sActiveTab_Return = 'wallets-new'
    } else {
      sActiveTab_Return = 'users';
    }

    return sActiveTab_Return
  }

  onChangeCurrentPage = (sKey_Tab: string) => {
    if (sKey_Tab === 'users') {
      this.oRouter.navigateByUrl('/')
    } else if (sKey_Tab === 'change-price') {
      this.oRouter.navigateByUrl('/change-price')
    } else if (sKey_Tab === 'wallets-new') {
      this.oRouter.navigateByUrl('/wallets-new')
    }
  }

}
