import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckerPreviewComponent } from './user-checker-preview.component';

describe('UserCheckerPreviewComponent', () => {
  let component: UserCheckerPreviewComponent;
  let fixture: ComponentFixture<UserCheckerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCheckerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
