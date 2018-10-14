import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsEntryFormComponent } from './flights-entry-form.component';

describe('FlightsEntryFormComponent', () => {
  let component: FlightsEntryFormComponent;
  let fixture: ComponentFixture<FlightsEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
