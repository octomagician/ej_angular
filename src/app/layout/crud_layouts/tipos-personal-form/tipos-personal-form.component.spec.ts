import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPersonalFormComponent } from './tipos-personal-form.component';

describe('TiposPersonalFormComponent', () => {
  let component: TiposPersonalFormComponent;
  let fixture: ComponentFixture<TiposPersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPersonalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
