import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyOneFilterValidator(control: AbstractControl): ValidationErrors | null {
  const year = control.get('year')?.value;
  const name = control.get('name')?.value;

  if (year && name) {
    return { bothFilters: true };
  }
  return null;
}
