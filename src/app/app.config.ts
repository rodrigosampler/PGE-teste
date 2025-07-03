import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {apiInterceptor} from './core/interceptors/api.interceptor';
import {GlobalErrorHandler} from './core/errors/GlobalErrorHandler';
import {httpErrorInterceptor} from './core/interceptors/error.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {customTheme} from './core/styles/customTheme';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor, httpErrorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MessageService, useClass: MessageService },
    { provide: DialogService, useClass: DialogService },
    provideClientHydration(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customTheme,
        options:{
          cssLayer: false,
          darkModeSelector: '.my-app-dark'

        }
      }
    })
  ]
};
