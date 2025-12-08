import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { LoginComponent } from './login/login'; // Asumiendo que ya tienes este componente

export const routes: Routes = [
    // 1. Ruta principal (Hero Page)
    { path: '', component: HeroComponent }, 

    // 2. Ruta de Login (para el botón)
    { path: 'login', component: LoginComponent }, 
    
    // 3. Ruta comodín para cualquier otra cosa (opcional)
    { path: '**', redirectTo: '' } 
];