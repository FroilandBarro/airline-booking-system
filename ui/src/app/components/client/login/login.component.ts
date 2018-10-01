import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminData: any = {
    adminId: null,
    password: null,
  }
  clientModel: any = {
    email : null,
    password: null,
  }
 
  

  constructor(
    private api: ApiService,
  ) { }
  

  ngOnInit() {
  }
  clientlogin(){
    this.api.clientLogin(this.clientModel);
  }
  adminlogin(){
    this.api.adminLogin(this.adminData);
  }


}
