import {AbstractControl, ValidationErrors} from '@angular/forms';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  if (!control.value) return null;
  const inputDate = new Date(control.value);
  return inputDate > new Date() ? { futureDate: true } : null;
}
