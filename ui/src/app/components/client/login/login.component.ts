import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  classes: any = [ {value: 0, label: 'Select Class'}, ...this.getPorts() ];

  constructor() { }
  

  ngOnInit() {
  }
  getPorts() {
    return [
      { value: 'DVO', label: 'ECO - Economy' },
      { value: 'CEB', label: 'BUS - Business' },
     
    ];
  }

}
