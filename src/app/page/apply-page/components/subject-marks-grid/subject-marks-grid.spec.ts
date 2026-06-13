import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMarksGrid } from './subject-marks-grid';

describe('SubjectMarksGrid', () => {
  let component: SubjectMarksGrid;
  let fixture: ComponentFixture<SubjectMarksGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectMarksGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectMarksGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
