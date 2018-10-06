import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/sharedData.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  adminData: any = {
    adminId: null,
    password: null,
  }
  constructor(
      private api: ApiService,
      private router: Router,
      private shared: SharedDataService,
      ) { }

  ngOnInit() {
  }
  adminlogin(){
    
    this.api.adminLogin(this.adminData).subscribe((res: any) => {
      if(res){
      console.log(res);
      this.shared.setUserData(res);
      localStorage.setItem('userData', JSON.stringify(res));
      this.router.navigateByUrl('/adminprofile');
    }
  })
  }
}
