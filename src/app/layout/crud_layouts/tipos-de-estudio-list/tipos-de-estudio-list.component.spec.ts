import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeEstudioListComponent } from './tipos-de-estudio-list.component';

describe('TiposDeEstudioListComponent', () => {
  let component: TiposDeEstudioListComponent;
  let fixture: ComponentFixture<TiposDeEstudioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDeEstudioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDeEstudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
