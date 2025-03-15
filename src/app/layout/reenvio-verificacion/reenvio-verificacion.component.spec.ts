import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenvioVerificacionComponent } from './reenvio-verificacion.component';

describe('ReenvioVerificacionComponent', () => {
  let component: ReenvioVerificacionComponent;
  let fixture: ComponentFixture<ReenvioVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReenvioVerificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReenvioVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
