import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarExistenteComponent } from './modificar-existente.component';

describe('ModificarExistenteComponent', () => {
  let component: ModificarExistenteComponent;
  let fixture: ComponentFixture<ModificarExistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarExistenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarExistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
