import { Routes } from '@angular/router';
import {ConstsLoginRoutes} from './modules/login/constants/ConstLoginRoutes';
import {authGuard} from './core/guards/auth.guard';
import {ConstsHomeRoutes} from './modules/home/constants/ConstHomeRoutes';
import {ConstsRegisterRoutes} from './modules/register/constants/ConstRegisterRoutes';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ConstsHomeRoutes.MODULE
  },
  {
    path: ConstsLoginRoutes.MODULE,
    loadChildren: () => import('./modules/login/login.routes').then(m => m.routes),
    canActivate: [],
    providers: []
  },
  {
    path: ConstsRegisterRoutes.MODULE,
    loadChildren: () => import('./modules/register/register.routes').then(m => m.routes),
    canActivate: [authGuard],
    providers: []
  },
  {
    path: ConstsHomeRoutes.MODULE,
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    providers: []
  },
];
