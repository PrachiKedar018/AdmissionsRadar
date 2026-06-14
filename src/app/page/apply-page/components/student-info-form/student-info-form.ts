import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { COURSE_CATEGORIES } from '../../../../core/config/course-config';
@Component({
  selector: 'app-student-info-form',
  imports: [ReactiveFormsModule,InputTextModule,SelectModule],
  templateUrl: './student-info-form.html',
  styleUrl: './student-info-form.scss',
})
export class StudentInfoForm {
  @Input() form!:FormGroup;
  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];
  groupedCourse = COURSE_CATEGORIES.map(cat=>({
    label:cat.category,
    value:cat.category.toLowerCase(),
    items:cat.courses.map(course=>({
      label:course,
      value:course
    }))
  }))
}
