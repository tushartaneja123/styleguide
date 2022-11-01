import { TestBed } from '@angular/core/testing';

import { MDMService } from './mdm.service';

describe('MdmService', () => {
  let service: MDMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
