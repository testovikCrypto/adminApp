import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private oHttpClient: HttpClient) {
  }

  public login = (sEmail: string, sPassword: string) => {
    return this.oHttpClient.post('https://startcryptotrade.com/api/auth/loginAdmin',
      {sEmail, sPassword})
  }

  public getUsers = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/users');
  }

  public getActiveDeals = (sID_User: string) => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/users/${sID_User}/activeDeals`)
  }

  public getClosedDeals = (sID_User: string) => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/users/${sID_User}/closedDeals`)
  }

  public getEvents = (sID_User: string) => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/users/${sID_User}/events`)
  }

  public getAllEvents = () => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/events`)
  }

  public getAllEventsFilteredByMonth = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/events/filteredByMonth')
  }

  public onProcessEvent = (bResult: boolean, sID_Event: string) => {
    let httpReturn;
    if (bResult) {
      httpReturn = this.oHttpClient.get(`https://startcryptotrade.com/api/auth/eventConfirm/${sID_Event}`)
    } else {
      httpReturn = this.oHttpClient.get(`https://startcryptotrade.com/api/auth/eventDeny/${sID_Event}`)
    }

    return httpReturn;
  }

  public putUsersBalance = (oUser: any) => {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${oUser._id}/balance`, {
      sBalance: oUser.sBalance
    });
  }

  public putReplenishAdded = (sID_User: string) => {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/replenish`, {nReplenishAmount: 0})
  }

  public putWithdrawSuccess = (sID_User: string) => {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/withdraw`, {
      nWithdrawAmount: 0,
      sWallet: ''
    })
  }

  public putVerificationConfirmation = (sID_User: string, sResult_Verification: any) => {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/user/${sID_User}/verified`, {
      sVerificationConfirmed: sResult_Verification
    });
  }

  public getAllSymbols = () => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/trade/getAllSymbols`);
  }

  public setPriceChangeParam = (nPriceChange: number, sChosenSymbol: string) => {
    return this.oHttpClient.post('https://startcryptotrade.com/api/realtime/setPriceChange', {
      symbol: sChosenSymbol,
      priceChange: nPriceChange
    })
  }

  public resetPriceChange = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/realtime/resetPriceChanges');
  }

  public getActualReplenishWallets = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/actualReplenishWallets');
  }

  public getaMainWallets = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/getWallets/true');
  }

  public getaGatewayWallets = () => {
    return this.oHttpClient.get('https://startcryptotrade.com/api/auth/getWallets/false');
  }

  public onSetMainWallet = (oWallet: any) => {
    return this.oHttpClient.post('https://startcryptotrade.com/api/auth/setWallet', oWallet);
  }

  public onDeleteWallet = (sID: string) => {
    return this.oHttpClient.get(`https://startcryptotrade.com/api/auth/deleteWallet/${sID}`);
  }

  public putActualReplenishWallet = (sID_Wallet: string, sCoin: string, sNetwork: string, sNewAddress: string) => {
    return this.oHttpClient.put(`https://startcryptotrade.com/api/auth/actualReplenishWallets/${sID_Wallet}`, {
      sCoin: sCoin,
      sNetwork: sNetwork,
      newAddress: sNewAddress
    });
  }
}
