import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentInfoForm } from "./components/student-info-form/student-info-form";
import { SubjectMarksGrid } from "./components/subject-marks-grid/subject-marks-grid";
import { ExamQualification } from "./components/exam-qualification/exam-qualification";
import { ApplicationPayload, EligibilityResponse } from '../../core/model/eligibility-response.interface';
import { RequiredCourse, getCategoryByCourseName } from '../../core/config/course-config';
import { EligibilityService } from '../../core/service/eligibility.service';
import { Router } from '@angular/router';
import { jeeQualificationValidator, neetQualificationValidator } from '../../core/validator/qualification.validator';

@Component({
  selector: 'app-apply-page',
  imports: [ReactiveFormsModule, StudentInfoForm, SubjectMarksGrid, ExamQualification],
  templateUrl: './apply-page.html',
  styleUrl: './apply-page.scss',
})
export class ApplyPage {
  applyForm!: FormGroup;
  requiredExam = signal<RequiredCourse>(null);
  private eligibilityService = inject(EligibilityService)
  private fb = inject(FormBuilder);
  private router = inject(Router);
  isLoading = signal(false);
  result = signal<EligibilityResponse | null>(null);

  private defaultSubjects = [
    { name: 'Mathematics', marks: '' },
    { name: 'Physics', marks: '' },
    { name: 'Chemistry', marks: '' },
    { name: 'English', marks: '' },
    { name: 'Computer Science', marks: '' },
    { name: 'Environmental Studies', marks: '' }
  ];

  private initForm() {
    this.applyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      age: ['', [Validators.required, Validators.min(17), Validators.max(25), Validators.pattern(/^\d+$/)]],
      gender: ['', [Validators.required]],
      desiredCourse: ['', [Validators.required]],
      subjects: this.fb.array(
        this.defaultSubjects.map(sub => this.fb.group({
          name: [sub.name, Validators.required],
          marks: [sub.marks, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]]
        }))
      )
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.applyForm.get('desiredCourse')?.valueChanges.subscribe((courseName) => {
      const config = getCategoryByCourseName(courseName);
      const exam = config ? config.requiredExam : null;
      this.requiredExam.set(exam);

      if (exam === 'JEE') {
        if (!this.applyForm.get('jeeQualification')) {
          this.applyForm.addControl(
            'jeeQualification',
            this.fb.group({
              cleared: ['', Validators.required],
              score: ['', [Validators.required, Validators.min(1)]]
            }, { validators: jeeQualificationValidator() })
          );
        }
        this.applyForm.removeControl('neetQualification');
      } else if (exam === 'NEET') {
        if (!this.applyForm.get('neetQualification')) {
          this.applyForm.addControl(
            'neetQualification',
            this.fb.group({
              cleared: ['', Validators.required],
              score: ['', [Validators.required, Validators.min(1)]]
            }, { validators: neetQualificationValidator() })
          );
        }
        this.applyForm.removeControl('jeeQualification');
      } else {
        this.applyForm.removeControl('jeeQualification');
        this.applyForm.removeControl('neetQualification');
      }
    });
  }

  resetForm(): void {
    this.applyForm.reset({
      name: '',
      age: '',
      gender: '',
      desiredCourse: '',
      subjects: this.defaultSubjects.map(sub => ({
        name: sub.name,
        marks: ''
      }))
    });
    this.result.set(null);
  }

  onSubmit(): void {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    const formVal = this.applyForm.value;
    const payload: ApplicationPayload = {
      name: formVal.name,
      age: parseInt(formVal.age, 10),
      gender: formVal.gender,
      desiredCourse: formVal.desiredCourse,
      subjects: formVal.subjects.map((s: any) => ({
        name: s.name,
        marks: parseInt(s.marks, 10)
      })),
      ...(this.requiredExam() === 'JEE' && formVal.jeeQualification ? {
        jeeQualification: {
          cleared: formVal.jeeQualification.cleared,
          score: parseInt(formVal.jeeQualification.score, 10)
        }
      } : {}),
      ...(this.requiredExam() === 'NEET' && formVal.neetQualification ? {
        neetQualification: {
          cleared: formVal.neetQualification.cleared,
          score: parseInt(formVal.neetQualification.score, 10)
        }
      } : {})
    }
    this.eligibilityService.checkEligibility(payload)
      .pipe().subscribe({
        next: (res) => {
          this.result.set(res);
          this.isLoading.set(false);
          alert("Application added successfully!");
          this.resetForm();
        },
        error: (err) => {
          alert("Submission failed!");
          this.isLoading.set(false);
        }
      })
  }
}
