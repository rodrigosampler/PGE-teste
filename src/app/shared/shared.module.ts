import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {DatePickerModule} from 'primeng/datepicker';
import {SelectModule} from 'primeng/select';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


const angularModules = [
  CommonModule,
  ReactiveFormsModule,
  RouterOutlet,
  FormsModule,
  RouterLink
];

const primeNgModules = [
  ButtonModule,
  TableModule,
  InputTextModule,
  DialogModule,
  ToastModule,
  MenubarModule,
  ToggleSwitchModule,
  DatePickerModule,
  InputMaskModule,
  DropdownModule,
  SelectModule,
  DynamicDialogModule,
  TableModule,
  ProgressSpinnerModule
];

const importsExports = [
  angularModules,
  primeNgModules
]

@NgModule({
  declarations: [],
  imports: [
    ...importsExports,
  ],
  exports: [
    ...importsExports
  ]
})
export class SharedModule {
}

