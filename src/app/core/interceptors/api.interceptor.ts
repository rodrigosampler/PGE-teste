import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';


export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);
  const token = auth.token();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
