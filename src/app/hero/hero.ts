import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Necesario para el routerLink

@Component({
  selector: 'app-hero',
  standalone: true, // Componente independiente (Standalone)
  imports: [CommonModule, RouterModule], 
  /*template: `
    <div class="min-h-screen flex items-center justify-center text-center p-4" 
     style="background: linear-gradient(135deg, #1f2937, #4f46e5);">
        <h1>¡LA HERO PAGE FINALMENTE FUNCIONA!</h1>
        </div>
  `, // <--- Elimina la línea templateUrl*/
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'] // Si quieres añadir estilos específicos
})
export class HeroComponent {
  title = 'Biblioteca Digital';
  subtitle = 'Explora un vasto catálogo de libros, gestiona tus proyectos y descubre nuevos autores. Ordena el conocimiento y empodera el mundo al alcance de tu mano.';
  buttonText = 'Acceder/Login';
  // Define la ruta del botón para que vaya al componente de login
  buttonLink = '/login'; 
}