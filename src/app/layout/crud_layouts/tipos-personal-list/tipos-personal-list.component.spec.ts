import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPersonalListComponent } from './tipos-personal-list.component';

describe('TiposPersonalListComponent', () => {
  let component: TiposPersonalListComponent;
  let fixture: ComponentFixture<TiposPersonalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPersonalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPersonalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
