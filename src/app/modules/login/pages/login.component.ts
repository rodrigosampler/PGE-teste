import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {Subscription} from 'rxjs';
import {ConstsRegisterRoutes} from '../../register/constants/ConstRegisterRoutes';
import {PasswordDirective} from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [SharedModule, PasswordDirective],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private subs: Subscription[] = [];

  errorMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.authService.isAuthenticated() && this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_LIST}`]);
  }

  ngOnDestroy() {
    this.subs.forEach(s=>s?.unsubscribe && s.unsubscribe());
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    this.subs.push(this.login(email!, password!))
  }

  login(email: string, password?: string): Subscription{
    return this.authService.login(email!, password!).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate([`${ConstsRegisterRoutes.MODULE}/${ConstsRegisterRoutes.CLIENT_LIST}`]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Email ou senha inválidos.';
      }
    });
  }
}
