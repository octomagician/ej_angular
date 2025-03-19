import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoListComponent } from './diagnostico-list.component';

describe('DiagnosticoListComponent', () => {
  let component: DiagnosticoListComponent;
  let fixture: ComponentFixture<DiagnosticoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
