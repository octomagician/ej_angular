import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaListComponent } from './cama-list.component';

describe('CamaListComponent', () => {
  let component: CamaListComponent;
  let fixture: ComponentFixture<CamaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
