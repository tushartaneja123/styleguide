import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedRemarksChipsComponent } from './suggested-remarks-chips.component';

describe('SuggestedRemarksChipsComponent', () => {
  let component: SuggestedRemarksChipsComponent;
  let fixture: ComponentFixture<SuggestedRemarksChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedRemarksChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedRemarksChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
