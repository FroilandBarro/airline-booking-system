import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/sharedData.service';
import { ToastrService } from 'ngx-toastr';

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
      private toaster: ToastrService,
      ) { }

  ngOnInit() {
  }

  adminlogin() {
    this.api.adminLogin(this.adminData).subscribe((res: any) => {
      if (res && res.data) {
        this.toaster.success('You have logged in successfully!', 'Welcome!');
      this.shared.setUserData(res);
      localStorage.setItem('userData', JSON.stringify(res.data));
      this.router.navigateByUrl('/admin');
    }
  })
  }
}
