import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeEstudioFormComponent } from './tipos-de-estudio-form.component';

describe('TiposDeEstudioFormComponent', () => {
  let component: TiposDeEstudioFormComponent;
  let fixture: ComponentFixture<TiposDeEstudioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDeEstudioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDeEstudioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
