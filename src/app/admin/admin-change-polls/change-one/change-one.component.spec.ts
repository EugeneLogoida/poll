import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOneComponent } from './change-one.component';

describe('ChangeOneComponent', () => {
  let component: ChangeOneComponent;
  let fixture: ComponentFixture<ChangeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
