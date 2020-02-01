import { TestBed } from '@angular/core/testing';

import { VisualcontrolService } from './visualcontrol.service';

describe('VisualcontrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisualcontrolService = TestBed.get(VisualcontrolService);
    expect(service).toBeTruthy();
  });
});
