// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // 💥 Importar withInterceptors
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './auth/auth.interceptor'; // 💥 Importar el interceptor

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 💥 Registrar el interceptor
    provideHttpClient(withInterceptors([authInterceptor])),
    
    importProvidersFrom(ReactiveFormsModule)
  ]
};