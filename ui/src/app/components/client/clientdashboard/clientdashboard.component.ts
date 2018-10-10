import { Component, OnInit } from '@angular/core';
import { SystemUtils } from '../../../services/system.utils.service';
import { SharedDataService } from '../../../services/sharedData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.scss']
})
export class ClientdashboardComponent implements OnInit {
  userData: any;
  name: "Lucky Jeanelle Zamora";
  constructor(
    private utils: SystemUtils,
    private shared: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    ) {
      this.shared.currentUserData.subscribe((userData: any) => {
      this.userData = userData;
      });
     }
     
     
     ngOnInit() {
      var id = this.route.snapshot.params.id;
      var name = this.route.snapshot.params.name;
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.userData = userData.data;
      console.log(userData.data);
      this.api.specificBooks(this.name);
    }

     click(){
       console.log(this.userData.name);
     }

 

}
