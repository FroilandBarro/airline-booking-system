import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../services/sharedData.service';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.scss']
})
export class AirlinesListComponent implements OnInit {

  airliners: any = [
    { code: 'pal', name: 'Philippines Airlines', nationality: 'Philippines', isSelected: true },
    { code: 'cpac', name: 'Cebu Pacific', nationality: 'Philippines', isSelected: false },
    { code: 'aasa', name: 'Air Asia', nationality: 'Singapore', isSelected: false },
  ];

  constructor(
    private sharedData: SharedDataService,
  ) {
    this.onSelect(this.airliners[0], 0);
  }

  ngOnInit() {
  }

  onSelect(airline, idx) {
    this.airliners.map((o, index) => {
      if (o.isSelected && index !== idx) {
        o.isSelected = false;
      }
    });
    this.sharedData.setFlights(this.getFlights(airline.code));
  }

  getFlights(code) {
    switch (code) {
      case 'pal':
        return this.getPALFlights();

      case 'cpac':
        return this.getCPACFlights();

      default:
        return [];
    }
  }

  getPALFlights () {
    return [
      { no: 'PAL-343',
        originCode: 'DVO',
        origin: 'Davao',
        destCode: 'MNL',
        destination: 'Manila',
        date: 'December 12, 2018',
        time: '16:45',
        available: 0,
        capacity: 75
      },
      { no: 'PAL-456',
        originCode: 'MNL',
        origin: 'MNL',
        destCode: 'CEB',
        destination: 'Cebu',
        date: 'December 12, 2018',
        time: '17:15',
        available: 0,
        capacity: 85
      },
    ];
  }

  getCPACFlights () {
    return [
      { no: 'CPAC-343',
        originCode: 'DVO',
        origin: 'Davao',
        destCode: 'MNL',
        destination: 'Manila',
        date: 'December 12, 2018',
        time: '16:45',
        available: 0,
        capacity: 75
      },
      { no: 'CPAC-456',
        originCode: 'MNL',
        origin: 'MNL',
        destCode: 'CEB',
        destination: 'Cebu',
        date: 'December 12, 2018',
        time: '17:15',
        available: 0,
        capacity: 85
      },
    ];
  }
}
