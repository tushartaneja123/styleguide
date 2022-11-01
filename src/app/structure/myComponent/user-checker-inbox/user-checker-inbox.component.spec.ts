import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckerInboxComponent } from './user-checker-inbox.component';

describe('UserCheckerInboxComponent', () => {
  let component: UserCheckerInboxComponent;
  let fixture: ComponentFixture<UserCheckerInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCheckerInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckerInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required fields in data table', () => {
    expect(component.displayedColumns).toBe(['id', 'initiator', 'description', 'date', 'taskTranId', 'processID','previousAsignee', 'status','remarks', 'action' ]);
  });

  it('should have required fields in data table', () => {
    expect(component.displayedColumns).toBe(['id', 'initiator', 'description', 'date', 'taskTranId', 'processID','previousAsignee', 'status','remarks', 'action' ]);
  });
});
