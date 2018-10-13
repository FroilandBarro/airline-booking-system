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
  bookedflights: any = [];
  bookSelected: any;
  withReturn: any = [];
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
      var id = this.route.snapshot.params.id
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.userData = userData.data;
      console.log(userData.data);
      this.api.specificBooks(this.userData).subscribe((res: any) =>{
        if(res && res.data){
          this.bookedflights= res.data;
          console.log(this.bookedflights);
         
        }
      });

     
    }

     click(form){
       this.bookSelected = form;
       console.log(this.bookedflights.lenght);
     }

 

}
