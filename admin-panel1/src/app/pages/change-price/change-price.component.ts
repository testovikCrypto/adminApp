import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-price',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.scss']
})
export class ChangePriceComponent implements OnInit {
  bInProcess_Change: boolean = false;
  bInProcess_Reset: boolean = false;
  nAmount: number = 0;
  sSearchPair: string = '';
  aoSymbol: any;
  sChosenSymbol: string = 'BTCUSDT';
  closeResult: string = '';

  constructor(private oRequestService: RequestService, private modalService: NgbModal) {
    this.oRequestService.getAllSymbols().subscribe((oRes: any) => {
      if (oRes && oRes.symbols && oRes.symbols.length) {
        this.aoSymbol = oRes.symbols;
      }
    })
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  ngOnInit(): void {
  }

  onChoosePair = (sSymbol: string, modal: any) => {
    this.sChosenSymbol = sSymbol;
    modal.close('Close click');
  }

  onChangePrice = () => {
    this.bInProcess_Change = true;
    let nPriceChange = this.nAmount * 0.01;
    this.oRequestService.setPriceChangeParam(nPriceChange, this.sChosenSymbol).subscribe((data) => {
      this.bInProcess_Change = false;
      this.nAmount = 0;
    })
  }

  onResetPrice = () => {
    this.bInProcess_Reset = true;
    this.oRequestService.resetPriceChange().subscribe(() => {
      this.bInProcess_Reset = false;
      this.nAmount = 0;
    });
  }
}
