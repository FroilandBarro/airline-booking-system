import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.scss']
})
export class AirlinesListComponent implements OnInit {

  airliners: any = [
    { id: 'pair', name: 'Philippines Airlines', nationality: 'Philippines' },
    { id: 'cpac', name: 'Cebu Pacific', nationality: 'Philippines' },
    { id: 'aasa', name: 'Air Asia', nationality: 'Singapore' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
