import {AbstractControl, ValidationErrors} from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  return validar_cpf(control.value != undefined ? control.value : '') ? null : {cpfValid: true};
}

 function validar_cpf(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') { return false; }
  if (cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999') {
    return false;
  }
  let add = 0;
  let i;
  for (i = 0; i < 9; i++) {
    // tslint:disable-next-line:radix
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  // tslint:disable-next-line:radix
  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }
  add = 0;
  for (i = 0; i < 10; i++) {
    // tslint:disable-next-line:radix
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  // tslint:disable-next-line:radix
  if (rev !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}
