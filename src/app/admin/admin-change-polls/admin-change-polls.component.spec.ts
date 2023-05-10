import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePollsComponent } from './admin-change-polls.component';

describe('AdminChangePollsComponent', () => {
  let component: AdminChangePollsComponent;
  let fixture: ComponentFixture<AdminChangePollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangePollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangePollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
