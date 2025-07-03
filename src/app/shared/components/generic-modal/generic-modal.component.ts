import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-generic-modal',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss'
})
export class GenericModalComponent {
  data: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.data = config.data;
  }

  confirm() {
    this.ref.close({ confirmed: true, message: 'Usuário confirmou!' });
  }

  cancel() {
    this.ref.close({ confirmed: false, message: 'Usuário cancelou!' });
  }
}
