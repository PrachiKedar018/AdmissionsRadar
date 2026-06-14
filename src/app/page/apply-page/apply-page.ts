import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentInfoForm } from "./components/student-info-form/student-info-form";
import { SubjectMarksGrid } from "./components/subject-marks-grid/subject-marks-grid";
import { ExamQualification } from "./components/exam-qualification/exam-qualification";
import { ApplicationPayload } from '../../core/model/eligibility-response.interface';
import { RequiredCourse } from '../../core/config/course-config';
import { EligibilityService } from '../../core/service/eligibility.service';

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
    isLoading = signal(false);
    result = signal<EligibilityResponse | null>(null);
  // applyForm = new FormGroup({
  //   appName:new FormControl
  // })
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
      gender:['',[Validators.required]],
      desiredCourse:['',[Validators.required]],
      subjects:this.fb.array(
        this.defaultSubjects.map(sub=>this.fb.group({
          name:[sub.name,Validators.required],
          marks:[sub.marks,[Validators.required,Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]]
        }))
      )
    })
  }
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit():void{
    if(this.applyForm.invalid){
      this.applyForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    const formVal = this.applyForm.value;
    const payload:ApplicationPayload={
      name:formVal.name,
      age:parseInt(formVal.age,10),
      gender:formVal.gender,
      desiredCourse:formVal.desiredCourse,
      subjects:formVal.subjects.map((s:any)=>({
        name:s.name,
        marks:parseInt(s.marks,10)
      })),
      // ...(this.requiredExam() === 'JEE'){

      // }
    }
    this.eligibilityService.checkEligibility(payload)
    .pipe().subscribe({
      next:(res)=>{
        this.result.set(res);
      }
    })
  }
}
