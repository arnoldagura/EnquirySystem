import { TestBed } from '@angular/core/testing';

import { ApploadService } from './app-load.service';

describe('ApploadService', () => {
  let service: ApploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
