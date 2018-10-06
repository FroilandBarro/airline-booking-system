import { Component, OnInit } from '@angular/core';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.scss']
})
export class ClientdashboardComponent implements OnInit {
  userData: any;
  constructor(
    private utils: SystemUtils,
    private shared: SharedDataService,
    private router: Router,
    ) {
      this.userData=this.utils.retrieveItem('userData');
     }
     click(){
       console.log(this.userData);
     }

  ngOnInit() {
  }

}
