import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public aUsersList: any = [];
  public sFilterUsers: string = '';
  public bShowFilter: boolean = false;

  constructor(private oRequest: RequestService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers = () => {
    this.oRequest.getUsers().subscribe((data: any) => {
      if (data && data.users && data.users.length) {
        this.aUsersList = data.users;
      }
    })
  }

  onChangeBalance = (oUser: any) => {
    this.oRequest.putUsersBalance(oUser).subscribe((data) => {
      oUser.bBalanceChanged = false;
      oUser = data;
    })
  }

  onConfirmWithdraw = (oUser: any) => {
    // oUser.sBalance = String(Number(oUser.sBalance) - oUser.nWithdrawAmount);
    // this.onChangeBalance(oUser);
    this.oRequest.putWithdrawSuccess(oUser._id).subscribe((oRes) => {
      this.getUsers();
    })
  }

  onCancelWithdraw = (oUser: any) => {
    oUser.sBalance = String(Number(oUser.sBalance) + oUser.nWithdrawAmount);
    this.onChangeBalance(oUser);
    this.oRequest.putWithdrawSuccess(oUser._id).subscribe((oRes) => {
      this.getUsers();
    })
  }

  onAddReplenishAmountAndConfirm = (oUser: any) => {
    oUser.sBalance = String(Number(oUser.sBalance) + oUser.nReplenishAmount);
    this.onChangeBalance(oUser);
    this.oRequest.putReplenishAdded(oUser._id).subscribe((oRes) => {
      this.getUsers();
    })
  }

  onSubmitVerification = (sID_User: string) => {
    this.oRequest.putVerificationConfirmation(sID_User, 'true').subscribe((oRes) => {
      console.log('oRes', oRes)
      this.getUsers();
    })
  }

  onDenyVerification = (sID_User: string) => {
    this.oRequest.putVerificationConfirmation(sID_User, 'false').subscribe((oRes) => {
      console.log('oRes', oRes)
      this.getUsers();
    })
  }

  onToggleFilter = () => {
    this.bShowFilter = !this.bShowFilter
  }
}
