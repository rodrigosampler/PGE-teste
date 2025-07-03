import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent),
  }
]
