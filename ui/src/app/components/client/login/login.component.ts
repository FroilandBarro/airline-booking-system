import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  adminData: any = {
  }

  constructor(
    private api: ApiService,
  ) { }
  

  ngOnInit() {
  }
  login(){
    this.api.adminLogin(this.adminData).subscribe((res: any)=> {
      if(res){
        console.log(res.json());
        localStorage.setItem('admindata', JSON.stringify(res.json()))
      }
    })
  
  }

}
