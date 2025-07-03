import {ErrorHandler, inject, Injectable, NgZone} from '@angular/core';
import {LogService} from '../services/log.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MessagesConstats} from '../../shared/constants/messages.constats';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logService = inject(LogService);
  private ngZone = inject(NgZone);
  private router: Router = inject(Router)
  private messageService = inject(MessageService);

  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      return;
    }

    const message = this.getErrorMessage(error);
    const stackTrace = this.getErrorStack(error);

    this.logService.log({
      message,
      stack: stackTrace,
      url: this.router.url,
      timestamp: new Date().toISOString(),
    });

    this.ngZone.run(() => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail:  MessagesConstats.DEFAULT_ERRO_HANDLER})
      console.error(`${MessagesConstats.DEFAULT_ERRO_HANDLER}  ${stackTrace}`);
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return MessagesConstats.ERRO_UNKNOW;
    }
  }

  private getErrorStack(error: unknown): string {
    if (error instanceof Error) {
      return error.stack || '';
    }
    return '';
  }
}
