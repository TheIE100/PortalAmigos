import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAmigosComponent } from './formulario-amigos.component';

describe('FormularioAmigosComponent', () => {
  let component: FormularioAmigosComponent;
  let fixture: ComponentFixture<FormularioAmigosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAmigosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
