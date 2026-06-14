import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function jeeQualificationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cleared = control.get('cleared')?.value;
    const score = control.get('score')?.value;

    if (cleared !== 'yes' || score === null || score === undefined || isNaN(score) || Number(score) <= 0) {
      return { jeeRequired: true };
    }
    return null;
  };
}

export function neetQualificationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cleared = control.get('cleared')?.value;
    const score = control.get('score')?.value;

    if (cleared !== 'yes' || score === null || score === undefined || isNaN(score) || Number(score) <= 0) {
      return { neetRequired: true };
    }
    return null;
  };
}
