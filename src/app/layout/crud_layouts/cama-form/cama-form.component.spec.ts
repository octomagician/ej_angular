import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaFormComponent } from './cama-form.component';

describe('CamaFormComponent', () => {
  let component: CamaFormComponent;
  let fixture: ComponentFixture<CamaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
