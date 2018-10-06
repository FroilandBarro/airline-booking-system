import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientlogin',
  templateUrl: './clientlogin.component.html',
  styleUrls: ['./clientlogin.component.scss']
})
export class ClientloginComponent implements OnInit {
  
  clientModel: any = {
    email : null,
    password: null,
  }

  constructor(
    private api: ApiService,
     private router: Router,
  ) { }

  ngOnInit() {
  }
  clientlogin(){
    this.api.clientLogin(this.clientModel).subscribe((res: any) => {
      if(res){
      console.log(res);
      localStorage.setItem('userData', JSON.stringify(res));
      this.router.navigateByUrl('/clientprofile');
    }
  })
  }
}
