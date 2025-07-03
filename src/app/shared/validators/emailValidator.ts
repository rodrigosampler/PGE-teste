import {AbstractControl, ValidationErrors} from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }



  return validar_email(control.value != undefined ? control.value : '') ? null : {emailValid: true};
}

 function validar_email(email: string) {
   const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   return regex.test(email);
}
