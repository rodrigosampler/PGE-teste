import {AbstractControl, ValidationErrors} from '@angular/forms';

export function contactValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const numero = control.value.replace(/\D/g, '');

  let numeroSemDDI = numero;

  // Remove DDI 55 se houver
  if (numero.startsWith('55') && numero.length > 11) {
    numeroSemDDI = numero.substring(2);
  }

  if (numeroSemDDI.length < 10) {
    // Se for menor que 10 dígitos => não tem DDD ou está incompleto
    return { dddObrigatorio: true };
  }

  const ddd = numeroSemDDI.substring(0, 2);
  const restante = numeroSemDDI.substring(2);

  // Valida DDD: deve ser numérico e ter 2 dígitos (mas aqui já está limpo)
  if (ddd.length !== 2) {
    return { dddObrigatorio: true };
  }

  if (restante.length === 9) {
    // Celular
    if (!restante.startsWith('9')) {
      return { celularInvalido: true };
    }
  } else if (restante.length === 8) {
    // Fixo - OK
    return null;
  } else {
    // Número fora do padrão
    return { telefoneInvalido: true };
  }

  return null;
}
