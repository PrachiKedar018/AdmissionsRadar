import { FormControl, FormGroup } from '@angular/forms';
import { jeeQualificationValidator, neetQualificationValidator } from './qualification.validator';

describe('Qualification Validators', () => {
  describe('jeeQualificationValidator', () => {
    let group: FormGroup;

    beforeEach(() => {
      group = new FormGroup({
        cleared: new FormControl(''),
        score: new FormControl('')
      }, { validators: jeeQualificationValidator() });
    });

    it('should return jeeRequired error when cleared is not yes', () => {
      group.patchValue({ cleared: 'no', score: 100 });
      expect(group.errors).toEqual({ jeeRequired: true });
    });

    it('should return jeeRequired error when score is <= 0', () => {
      group.patchValue({ cleared: 'yes', score: 0 });
      expect(group.errors).toEqual({ jeeRequired: true });
    });

    it('should return null when cleared is yes and score is positive', () => {
      group.patchValue({ cleared: 'yes', score: 250 });
      expect(group.errors).toBeNull();
    });
  });

  describe('neetQualificationValidator', () => {
    let group: FormGroup;

    beforeEach(() => {
      group = new FormGroup({
        cleared: new FormControl(''),
        score: new FormControl('')
      }, { validators: neetQualificationValidator() });
    });

    it('should return neetRequired error when cleared is not yes', () => {
      group.patchValue({ cleared: 'no', score: 400 });
      expect(group.errors).toEqual({ neetRequired: true });
    });

    it('should return neetRequired error when score is invalid', () => {
      group.patchValue({ cleared: 'yes', score: -10 });
      expect(group.errors).toEqual({ neetRequired: true });
    });

    it('should return null when cleared is yes and score is positive', () => {
      group.patchValue({ cleared: 'yes', score: 600 });
      expect(group.errors).toBeNull();
    });
  });
});
