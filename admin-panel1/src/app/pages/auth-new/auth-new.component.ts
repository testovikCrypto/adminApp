import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-auth-new',
  templateUrl: './auth-new.component.html',
  styleUrls: ['./auth-new.component.scss']
})
export class AuthNewComponent implements OnInit {
  public bErrorLogin: boolean = false;
  public sEmail: string = '';
  public sPassword: string = '';
  public bShowPassword: boolean = false
  constructor(private oRequestService: RequestService) {
  }

  ngOnInit(): void {
  }

  onFieldChanged = () => {
    this.bErrorLogin = false;
  }

  onSubmit_LoginForm = () => {
    if (this.sEmail && this.sPassword) {
      this.oRequestService.login(this.sEmail, this.sPassword).subscribe((data: any) => {
        if (data && data.token) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          window.location.reload();
        } else if (data && data.message) {
          console.log('Login error:', data.message);
          this.bErrorLogin = true;
          this.sEmail = '';
          this.sPassword = '';
          document.getElementById('knclyezcs')?.focus();
        } else {
          console.log('[onSubmit_LoginForm], unexpected error');
        }
      });
    }
  }

}
