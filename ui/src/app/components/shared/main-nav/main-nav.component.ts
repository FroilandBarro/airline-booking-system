import { Component, OnInit } from '@angular/core';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  userData: any;
  constructor(
    private utils: SystemUtils,
    private shared: SharedDataService,
    private router: Router,
  ) {
    this.shared.currentUserData.subscribe((userData: any) => {
    this.userData = userData;
    console.log(this.userData);
    });
  }

  ngOnInit() {
  }

  logout() {
    this.shared.setUserData(null);
    this.utils.deleteKey('userData');
    this.router.navigateByUrl('/clientlogin');
  }

}
