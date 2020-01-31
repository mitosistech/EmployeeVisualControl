import { TestBed } from '@angular/core/testing';

import { SelectcompanyService } from './selectcompany.service';

describe('SelectcompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectcompanyService = TestBed.get(SelectcompanyService);
    expect(service).toBeTruthy();
  });
});
