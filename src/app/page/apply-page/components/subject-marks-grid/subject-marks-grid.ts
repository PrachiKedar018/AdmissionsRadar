import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'app-subject-marks-grid',
  imports: [ReactiveFormsModule, InputText],
  templateUrl: './subject-marks-grid.html',
  styleUrl: './subject-marks-grid.scss',
})
export class SubjectMarksGrid {
  @Input() form!:FormGroup;
  get subjectArray():FormArray{
    return this.form.get('subjects') as FormArray;  }
}
