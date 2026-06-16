import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SubjectMarksGrid } from './subject-marks-grid';

describe('SubjectMarksGrid', () => {
  let component: SubjectMarksGrid;
  let fixture: ComponentFixture<SubjectMarksGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectMarksGrid, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectMarksGrid);
    component = fixture.componentInstance;
    const fb = new FormBuilder();
    component.form = fb.group({
      subjects: fb.array([])
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
