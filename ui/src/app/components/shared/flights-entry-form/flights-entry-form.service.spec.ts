import { TestBed } from '@angular/core/testing';

import { FlightsEntryFormService } from './flights-entry-form.service';

describe('FlightsEntryFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightsEntryFormService = TestBed.get(FlightsEntryFormService);
    expect(service).toBeTruthy();
  });
});
