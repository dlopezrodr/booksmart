// src/app/hero/hero.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth'; // Asume que tienes este servicio
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
  standalone: true,
  imports: [
    CommonModule // 👈 ¡AÑADIR CommonModule aquí! Esto incluye DatePipe, NgIf, etc.
  ],
})
export class HeroComponent implements OnInit {
  // Observable que emite true/false según si el usuario está logueado
  isLoggedIn$!: Observable<boolean>; 
  
  // Nombre del usuario (debería venir de un Observable en el servicio también)
  userName$!: Observable<string>; 
  constructor(private authService: AuthService, private router: Router) { 
    console.log('HeroComponent cargado. Servicio de Auth:', this.authService);
  }

  ngOnInit(): void {
    // Inicializa el Observable del estado de login
    this.isLoggedIn$ = this.authService.isLoggedIn$; 
    
    // (Opcional) Suscribirse para obtener el nombre de usuario
    this.authService.getCurrentUserName().subscribe(name => {
      this.userName$ = this.authService.getCurrentUserName();
    });
  }

  onLogin(): void {
    // Redirige a la página de login o abre un modal
    console.log('Navegando a /login');
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    // Llama al método del servicio que elimina el token
    this.authService.logout(); 
    console.log('Usuario ha cerrado sesión.');
  }
  onDiscover(): void {
    // Redirigir a la ruta definida en app.routes.ts como 'books'
    this.router.navigate(['/books']); 
    console.log('--- Intentando navegar a /books ---');
    console.log('Navegando a la lista de libros.');
  }
}