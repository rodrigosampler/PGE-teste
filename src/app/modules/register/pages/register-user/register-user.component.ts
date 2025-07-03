import { Component } from '@angular/core';
import {SharedModule} from '../../../../shared/shared.module';

@Component({
  selector: 'app-register-user',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

}
