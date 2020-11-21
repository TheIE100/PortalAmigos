import { TestBed } from '@angular/core/testing';

import { FormularioAmigosService } from './formulario-amigos.service';

describe('FormularioAmigosService', () => {
  let service: FormularioAmigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioAmigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
