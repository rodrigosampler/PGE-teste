import {Routes} from "@angular/router";
import {ConstsRegisterRoutes} from './constants/ConstRegisterRoutes';
import {authGuard} from '../../core/guards/auth.guard';
import {ConstsRoles} from './constants/ConstRoles';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/register-client/register-client.component').then(m => m.RegisterClientComponent),
  },
  {
    path: ConstsRegisterRoutes.CLIENT_REGISTER,
    canActivate: [authGuard],
    data: {roles: [ConstsRoles.ADMIN_ROLE, ConstsRoles.USER_ROLE]},
    loadComponent: () => import('./pages/register-client/register-client.component').then(m => m.RegisterClientComponent),
  },
  {
    path: ConstsRegisterRoutes.CLIENT_REGISTER_EDIT,
    canActivate: [authGuard],
    data: {roles: [ConstsRoles.ADMIN_ROLE, ConstsRoles.USER_ROLE]},
    loadComponent: () => import('./pages/register-client/register-client.component').then(m => m.RegisterClientComponent),
  },
  {
    path: ConstsRegisterRoutes.CLIENT_LIST,
    canActivate: [authGuard],
    data: {roles: [ConstsRoles.ADMIN_ROLE, ConstsRoles.USER_ROLE]},
    loadComponent: () => import('./pages/list-client/list-client.component').then(m => m.ListClientComponent),
  },
  {
    path: ConstsRegisterRoutes.USER,
    canActivate: [authGuard],
    data: {roles: [ConstsRoles.ADMIN_ROLE]},
    loadComponent: () => import('./pages/register-user/register-user.component').then(m => m.RegisterUserComponent),
  },
]
