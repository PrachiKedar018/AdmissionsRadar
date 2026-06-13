import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoForm } from './student-info-form';

describe('StudentInfoForm', () => {
  let component: StudentInfoForm;
  let fixture: ComponentFixture<StudentInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInfoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
