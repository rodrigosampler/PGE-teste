import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[telefoneMask]'
})
export class TelefonePipe {
    constructor(private el: ElementRef) { }
    @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
      this.el.nativeElement.value = this.formatarTelefone(value);
  }

  private formatarTelefone(value: string): string {
    const numeroApenasDigitos = value.replace(/\D/g, '');

    let foneFormatado = '';

    if (numeroApenasDigitos.length === 13 && numeroApenasDigitos.startsWith('55')) {
      // DDI + DDD + celular
      foneFormatado = numeroApenasDigitos.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
    } else if (numeroApenasDigitos.length === 12 && numeroApenasDigitos.startsWith('55')) {
      // DDI + DDD + fixo
      foneFormatado = numeroApenasDigitos.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
    } else if (numeroApenasDigitos.length === 11) {
      // DDD + celular
      foneFormatado = numeroApenasDigitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroApenasDigitos.length === 10) {
      // DDD + fixo
      foneFormatado = numeroApenasDigitos.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeroApenasDigitos.length === 9) {
      // Local celular sem DDD
      foneFormatado = numeroApenasDigitos.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else if (numeroApenasDigitos.length === 8) {
      // Local fixo sem DDD
      foneFormatado = numeroApenasDigitos.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
      foneFormatado = numeroApenasDigitos; // fallback
    }
    return foneFormatado;
  }
}
