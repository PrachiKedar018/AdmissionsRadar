import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQualification } from './exam-qualification';

describe('ExamQualification', () => {
  let component: ExamQualification;
  let fixture: ComponentFixture<ExamQualification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamQualification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQualification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
