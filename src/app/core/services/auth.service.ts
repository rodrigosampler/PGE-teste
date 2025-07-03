import {computed, effect, Inject, inject, Injectable, OnDestroy, PLATFORM_ID, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Subscription, tap} from "rxjs";


import {AuthResponse, User} from '../../modules/login/interfaces/Login';
import {isPlatformBrowser} from '@angular/common';
import {env} from '../../../environments/environment';
import {GenericService} from '../../shared/services/generic.service';
import {ConstsLoginRoutes} from '../../modules/login/constants/ConstLoginRoutes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private http: HttpClient = inject(HttpClient);
  private service: GenericService = inject(GenericService);
  private router = inject(Router);
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private _isAuthenticated = signal<boolean | null>(null);
  private readonly platformId = inject(PLATFORM_ID);
  private subs: Subscription[] = [];

  user = computed(() => this._user());
  token = computed(() => this._token());
  isAuthenticated = computed(() => this._isAuthenticated());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._user.set(this.loadUserFromStorage());
      this._token.set(this.loadTokenFromStorage());
    }

    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const currentUser = this._user();
      if (currentUser) {
        sessionStorage.setItem('user', JSON.stringify(currentUser));
      }

      const currentToken = this._token();
      if (currentToken) {
        this.isAuthenticated != null && this.validToken();
        sessionStorage.setItem('accessToken', currentToken);
      }
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${env.host}/login`, {email, password})
      .pipe(
        tap(response => {
          this._user.set(response.user);
          this._token.set(response.accessToken);
          this._isAuthenticated.set(true);
        })
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._isAuthenticated.set(false);
    sessionStorage.clear();
    this.router.navigate([ConstsLoginRoutes.MODULE]);
  }

  private loadUserFromStorage(): User | null {
    const data = sessionStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  private loadTokenFromStorage(): string | null {
    const data =  sessionStorage.getItem('accessToken');
    return data ? data : null;
  }

  validToken(): void {
    this.subs.push(
      this.service.findByUserId('/clients', this.user()?.id.toString() || "").subscribe(resp => {
        this._isAuthenticated.set(true);
      }, error => {
        console.error(error);
        this.logout();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s=>s?.unsubscribe && s.unsubscribe());
  }
}
