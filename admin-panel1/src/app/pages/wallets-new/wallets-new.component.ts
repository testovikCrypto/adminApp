import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-wallets-new',
  templateUrl: './wallets-new.component.html',
  styleUrls: ['./wallets-new.component.scss']
})
export class WalletsNewComponent implements OnInit {
  constructor(private oRequestService: RequestService) {
  }

  public aMonthsList = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

  public bShowModal: boolean = false;
  public aoMainWallets: any = [];
  public aoGatewayWallets: any = [];
  public nTotalDeposits: number = 0;
  public mEventsFilteredByMonth: any;
  public asMonthEvents: any = [];
  public nTotalUsers: number = 0;
  public oWalletForModal: any = {
    sNetwork: '',
    sWallet: '',
    bMainWallet: true,
    sCurrency: 'USDT',
    sPrivateKey: ''
  };

  ngOnInit() {
    this.onUpdateWallets();
    this.getTotalDeposits();
    this.getTotalUsers();
    this.getTotalDepositsFilteredByMonth();
  }

  onCloseWalletModal = () => {
    this.bShowModal = false;
    this.oWalletForModal = {
      sNetwork: '',
      sWallet: '',
      bMainWallet: true,
      sCurrency: 'USDT',
      sPrivateKey: ''
    }
  }

  onEditWallet = (oWallet: any) => {
    this.oWalletForModal = oWallet;
    this.bShowModal = true;
  }

  onDeleteWallet = (oWallet: any) => {
    this.oRequestService.onDeleteWallet(oWallet._id).subscribe((oResponse: any) => {
      this.onUpdateWallets();
    })
  };

  onSaveWallet = () => {
    console.log('this.oWalletForModal', this.oWalletForModal)
    if (this.oWalletForModal.sCurrency === 'USDT') {
      this.oWalletForModal.sNetwork = 'TRC20'
    } else if (this.oWalletForModal.sCurrency === 'ETH') {
      this.oWalletForModal.sNetwork = 'ERC20'
    } else if (this.oWalletForModal.sCurrency === 'Bitcoin') {
      this.oWalletForModal.sNetwork = 'Bitcoin'
    }
    this.oRequestService.onSetMainWallet(this.oWalletForModal).subscribe((oResponse: any) => {
      this.onUpdateWallets();
      this.onCloseWalletModal();
    })
  }

  getTotalDeposits = () => {
    this.oRequestService.getAllEvents().subscribe((oRes: any) => {
      if(oRes && oRes.events && oRes.events.length) {
        oRes.events.forEach((oEvent: any) => {
          if (oEvent.sKey_Type === 'replenish' && oEvent.sConfirmed === 'true') {
            this.nTotalDeposits += oEvent.nSum;
          }
        })
      }
    })
  }

  getsNameByMonth = (sYearMonth: string) => {
    let sNameByMonth_Return = '';
    this.aMonthsList.forEach((sMonth, nIndex) => {
      if (Number(sYearMonth.split('-')[1]) === nIndex + 1) {
        sNameByMonth_Return = sMonth
      }
    })

    return sNameByMonth_Return;
  }

  getnTotalDepositsByMonth = (sYearMonth: string) => {
    let nTotalDepositsByMonth_Return = 0;
    this.mEventsFilteredByMonth[sYearMonth].forEach((oMonthEvent: any) => {
      if (oMonthEvent.sKey_Type === 'replenish' && oMonthEvent.sConfirmed === 'true') {
        nTotalDepositsByMonth_Return += oMonthEvent.nSum;
      }
    })

    return nTotalDepositsByMonth_Return;
  }

  getTotalDepositsFilteredByMonth = () => {
    this.oRequestService.getAllEventsFilteredByMonth().subscribe((oRes: any) => {
      console.log('[getAllEventsFilteredByMonth], oRes:', oRes)
      if(oRes && oRes.mEventsFilteredByMonth && Object.keys(oRes.mEventsFilteredByMonth).length) {
        this.mEventsFilteredByMonth = oRes.mEventsFilteredByMonth;
        this.asMonthEvents = Object.keys(oRes.mEventsFilteredByMonth);
      }
    })
  }

  getTotalUsers = () => {
    this.oRequestService.getUsers().subscribe((data: any) => {
      if (data && data.users) {
        this.nTotalUsers = data.users.length
      }
    })
  }

  onAddGatewayWallet = () => {
    this.oWalletForModal.bMainWallet = false;
    this.bShowModal = true;
  }

  onAddMainWallet = () => {
    this.oWalletForModal.bMainWallet = true;
    this.bShowModal = true;
  }

  onUpdateWallets = () => {
    this.oRequestService.getaMainWallets().subscribe((oResponse: any) => {
      console.log('oResponse', oResponse)
      this.aoMainWallets = oResponse;
    })

    this.oRequestService.getaGatewayWallets().subscribe((oResponse: any) => {
      this.aoGatewayWallets = oResponse;
    })
  }
}
