import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequiredCourse } from '../../../../core/config/course-config';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-exam-qualification',
  imports: [ReactiveFormsModule,SelectModule],
  templateUrl: './exam-qualification.html',
  styleUrl: './exam-qualification.scss',
})
export class ExamQualification {
  @Input() form!: FormGroup;
  @Input() requiredExam:RequiredCourse = null;

  clearedOptions = [
    { label: 'Yes, Cleared', value: 'yes' },
    { label: 'No, Not Cleared', value: 'no' }
  ]
}
