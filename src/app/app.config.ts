import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms'; // Módulo para formularios

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 1. Proveedor HTTP
    provideHttpClient(),       
    
    // 2. Habilita las directivas [formGroup] y [formControlName] (¡Coma separadora implícita!)
    importProvidersFrom(ReactiveFormsModule)
  ]
};