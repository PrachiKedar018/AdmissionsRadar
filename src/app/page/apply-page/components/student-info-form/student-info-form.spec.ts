import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StudentInfoForm } from './student-info-form';

describe('StudentInfoForm', () => {
  let component: StudentInfoForm;
  let fixture: ComponentFixture<StudentInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoForm, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoForm);
    component = fixture.componentInstance;
    const fb = new FormBuilder();
    component.form = fb.group({
      name: [''],
      age: [''],
      gender: [''],
      desiredCourse: ['']
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
