import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVezComponent } from './primera-vez.component';

describe('PrimeraVezComponent', () => {
  let component: PrimeraVezComponent;
  let fixture: ComponentFixture<PrimeraVezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeraVezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
