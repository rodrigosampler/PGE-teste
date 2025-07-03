import {inject, Injectable} from '@angular/core';
import {GenericModalComponent} from './generic-modal.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class GenericModalService {
  private ref!: DynamicDialogRef;
  private dialogService = inject(DialogService)

  openModal(data: {titulo:string, descricao:string}, actionSucces: () => void, actionCancel: () => void) {
    this.ref = this.dialogService.open(GenericModalComponent, {
      header: data.titulo,
      width: '40%',
      data: data,
      closable: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      dismissableMask: false,
      modal: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        if (result.confirmed) {
          actionSucces();
        } else {
          actionCancel();
        }
      }
    });
  }
}
