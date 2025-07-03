import {CanActivateFn, Router} from '@angular/router';

import {inject} from "@angular/core";
import {AuthService} from '../services/auth.service';
import {ConstsLoginRoutes} from '../../modules/login/constants/ConstLoginRoutes';
import {MessageService} from 'primeng/api';

export const authGuard: CanActivateFn = (route) => {
  const service = inject(AuthService);
  const token = service.token();
  const user = service.user();
  const router: Router = inject(Router);
  const messageService = inject(MessageService);

  if (token) {
    if (route.data['roles'] && !route.data['roles'].includes(user?.role)) {
      messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'Usuario sem permissão para acessar essa pagina!' })
      return false;
    }
    return true;
  } else {
    router.navigate([ConstsLoginRoutes.MODULE]);
    return false;
  }

};
