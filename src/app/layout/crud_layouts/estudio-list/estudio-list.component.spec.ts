import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioListComponent } from './estudio-list.component';

describe('EstudioListComponent', () => {
  let component: EstudioListComponent;
  let fixture: ComponentFixture<EstudioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
