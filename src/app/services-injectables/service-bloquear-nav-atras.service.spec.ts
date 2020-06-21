import { TestBed } from '@angular/core/testing';

import { ServiceBloquearNavAtrasService } from './service-bloquear-nav-atras.service';

describe('ServiceBloquearNavAtrasService', () => {
  let service: ServiceBloquearNavAtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBloquearNavAtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
