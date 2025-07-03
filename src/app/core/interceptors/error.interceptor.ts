import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, EMPTY} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {MessageService} from 'primeng/api';
import {LogService} from '../services/log.service';
import {MessagesConstats} from '../../shared/constants/messages.constats';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthService);
  const messageService = inject(MessageService);
  const logService = inject(LogService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 400:
            messageService.add({ severity: 'error', summary: 'Error', detail: MessagesConstats.CREDENTIAL_INVALID })
            console.error(MessagesConstats.CREDENTIAL_INVALID)
            service.logout();
            break;

          case 401:
            messageService.add({ severity: 'error', summary: 'Error', detail: MessagesConstats.SESSAO_EXPIRADA })
            console.error(MessagesConstats.SESSAO_EXPIRADA)
            service.logout();
            break;

          case 403:
            messageService.add({ severity: 'error', summary: 'Error', detail: MessagesConstats.FORBIDEN})
            console.error(MessagesConstats.FORBIDEN)
            break;

          case 404:
            messageService.add({ severity: 'error', summary: 'Error', detail: MessagesConstats.NOT_FOUND })
            console.error(MessagesConstats.NOT_FOUND)
            break;

          case 500:
            messageService.add({ severity: 'error', summary: 'Error', detail: MessagesConstats.SERVICE_ERROR })
            console.error(MessagesConstats.SERVICE_ERROR)
            break;

          default:
            messageService.add({ severity: 'error', summary: 'Error', detail: `${MessagesConstats.DEFAULT_ERRO}${error.message}` })
            console.error(`${MessagesConstats.DEFAULT_ERRO}${error.message}`)
            break;
        }
      }

      return EMPTY;
    }),
  );
};
