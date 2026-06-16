import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExamQualification } from './exam-qualification';

describe('ExamQualification', () => {
  let component: ExamQualification;
  let fixture: ComponentFixture<ExamQualification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamQualification, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQualification);
    component = fixture.componentInstance;
    const fb = new FormBuilder();
    component.form = fb.group({
      jeeQualification: fb.group({
        cleared: [''],
        score: ['']
      }),
      neetQualification: fb.group({
        cleared: [''],
        score: ['']
      })
    });
    component.requiredExam = 'JEE';
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
