import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreationPreviewComponent } from './department-creation-preview.component';

describe('DepartmentCreationPreviewComponent', () => {
  let component: DepartmentCreationPreviewComponent;
  let fixture: ComponentFixture<DepartmentCreationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCreationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCreationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
