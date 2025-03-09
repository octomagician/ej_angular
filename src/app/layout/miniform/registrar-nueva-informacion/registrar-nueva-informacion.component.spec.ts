import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNuevaInformacionComponent } from './registrar-nueva-informacion.component';

describe('RegistrarNuevaInformacionComponent', () => {
  let component: RegistrarNuevaInformacionComponent;
  let fixture: ComponentFixture<RegistrarNuevaInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarNuevaInformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarNuevaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
