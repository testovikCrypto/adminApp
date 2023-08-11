import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-actual-wallets',
  templateUrl: './actual-wallets.component.html',
  styleUrls: ['./actual-wallets.component.scss']
})
export class ActualWalletsComponent implements OnInit {

  public oActualWallets: any;
  public oEditingWallet: any = undefined;
  public sID_Wallet: string = '';

  constructor(private oRequestService: RequestService) {
  }

  getValueByKey = (oWallet: any, sKey: string) => {
    return oWallet.value[sKey];
  }

  ngOnInit(): void {
    this.onUpdateWallets();
  }

  onUpdateWallets = () => {
    this.oRequestService.getActualReplenishWallets().subscribe((oRes: any) => {
      if (oRes && oRes.wallets && oRes.wallets[0] && oRes.wallets[0].oWallets) {
        this.oActualWallets = oRes.wallets[0].oWallets;
        this.sID_Wallet = oRes.wallets[0]._id
      }
    })
  }

  onEditWallet = (oWallet: any, sNetwork: string) => {
    this.oEditingWallet = {
      sNetwork: sNetwork,
      sValue: oWallet.value[sNetwork],
      sKey: oWallet.key
    }
  }

  onSaveActualWallets = () => {
    this.oRequestService.putActualReplenishWallet(this.sID_Wallet,
      this.oEditingWallet.sKey,
      this.oEditingWallet.sNetwork,
      this.oEditingWallet.sValue
    ).subscribe((oRes: any) => {
        this.onUpdateWallets();
        this.oEditingWallet = undefined;
    })
  }
}
