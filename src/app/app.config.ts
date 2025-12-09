// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 💥 Importación esencial para HTTP
import { ReactiveFormsModule } from '@angular/forms'; // Módulo para formularios

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 1. 💥 Habilita el cliente HTTP (Necesario para BookService, AuthService, etc.)
    provideHttpClient(),
    
    // 2. Habilita las directivas [formGroup] y [formControlName]
    importProvidersFrom(ReactiveFormsModule)
  ]
};