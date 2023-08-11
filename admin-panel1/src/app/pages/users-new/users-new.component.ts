import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {
  public aUsersList: any = [];
  public sFilterUsers: string = '';
  public bShowModal: boolean = false;
  public oUserForModal: any;
  public aoActiveDealsForModal: any;
  public aoClosedDealsForModal: any;
  public aoEventsForModal: any[] = [];

  constructor(private oRequestService: RequestService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onOpenUserModal = (oUser: any) => {
    this.oUserForModal = oUser;
    this.bShowModal = true;
    this.oRequestService.getActiveDeals(oUser._id).subscribe((aoActiveDealsForModal) => {
      this.aoActiveDealsForModal = aoActiveDealsForModal
    });
    this.oRequestService.getClosedDeals(oUser._id).subscribe((aoClosedDealsForModal) => {
      this.aoClosedDealsForModal = aoClosedDealsForModal
    });
    this.oRequestService.getEvents(oUser._id).subscribe((oRes: any) => {
      this.aoEventsForModal = oRes.events
      this.aoEventsForModal.sort((a, b) => {
        return dayjs(a.sDateTime) < dayjs(b.sDateTime) ? 1 : -1
      })
    })
  }

  getFormattedDateTime = (oUser: any) => {
    let sFormattedDatedTime_Return = '';
    if (oUser && oUser.sDateTime_Registered) {
      sFormattedDatedTime_Return = dayjs(oUser.sDateTime_Registered).format('DD/MM/YYYY HH:mm')
    }else if (oUser && oUser.sDateTime) {
      sFormattedDatedTime_Return = dayjs(oUser.sDateTime).format('DD/MM/YYYY HH:mm')
    }

    return sFormattedDatedTime_Return;
  }

  onSubmitVerification = (sID_User: string) => {
    this.oRequestService.putVerificationConfirmation(sID_User, 'true').subscribe((oRes) => {
      this.getUsers();
    })
  }

  onDenyVerification = (sID_User: string) => {
    this.oRequestService.putVerificationConfirmation(sID_User, 'false').subscribe((oRes) => {
      this.getUsers();
    })
  }

  onCloseUserModal = () => {
    this.oUserForModal = undefined;
    this.bShowModal = false;
  }

  getUsers = () => {
    this.oRequestService.getUsers().subscribe((data: any) => {
      if (data && data.users && data.users.length) {
        this.aUsersList = data.users;
      }
    })
  }

  onProcessEvent = (bResult: boolean, oEvent: any) => {
    this.oRequestService.onProcessEvent(bResult, oEvent._id).subscribe((oRes: any) => {
      oEvent.bCompleted = oRes.event.bCompleted;
      oEvent.sConfirmed = oRes.event.sConfirmed;
      this.getUsers();
    })
  }
}
