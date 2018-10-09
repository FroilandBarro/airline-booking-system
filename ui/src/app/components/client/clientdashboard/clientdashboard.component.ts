import { Component, OnInit } from '@angular/core';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
    ) {
      this.shared.currentUserData.subscribe((userData: any) => {
      this.userData = userData;
      });
     }
     click(){
       console.log(this.userData);
     }

  ngOnInit() {
    var id = this.route.snapshot.params.id
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.userData = userData.data;
  }

}
