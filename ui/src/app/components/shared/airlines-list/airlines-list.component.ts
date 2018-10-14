import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/sharedData.service';
import { AdminApiService } from 'src/app/services/admin.api.service';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.scss']
})
export class AirlinesListComponent implements OnInit {

  airliners: any = [
    { code: 'PAL', name: 'Philippines Airlines', nationality: 'Philippines', isSelected: true },
    { code: 'CPAC', name: 'Cebu Pacific', nationality: 'Philippines', isSelected: false },
    { code: 'AASA', name: 'Air Asia', nationality: 'Singapore', isSelected: false },
  ];

  constructor(
    private api: AdminApiService,
    private sharedData: SharedDataService,
  ) {
    this.getFlights(this.airliners[0]);
  }

  ngOnInit() {
  }

  onSelect(airline, idx) {
    this.airliners.map((o, index) => {
      if (o.isSelected && index !== idx) {
        o.isSelected = false;
      }
    });
  }

  getFlights(selected) {
    this.sharedData.setActiveAirliner(selected);
    const airliner = selected.code;

    this.api.getFlights({ airliner })
      .subscribe((response: any) => {
        this.sharedData.setFlights(response.data);
      });
  }
}
