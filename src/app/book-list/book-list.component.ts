// src/app/books/book-list/book-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../books/book.service'; // 💥 Importar el servicio
//import { Book } from '../models/book.model'; // 💥 Importar el modelo (Asegúrate de que la ruta sea correcta)
import { tap } from 'rxjs/operators'; // Para depuración

// Definición simple del modelo de datos para el ejemplo
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  
  books$!: Observable<Book[]>; 
  
  // 💥 Inyectar el Router y el BookService
  constructor(
    private router: Router,
    private bookService: BookService // Inyectar el servicio real
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  /**
   * Carga la lista de libros desde el servicio (Llamada HTTP real).
   */
  loadBooks(): void {
    // 💥 Reemplazar con la llamada real al servicio
    this.books$ = this.bookService.getAllBooks().pipe(
      // Opcional: Para ver los datos en consola y verificar la carga
      tap(books => console.log('Libros cargados:', books)) 
    ); 
  }

  // ===================================
  // MÉTODOS DEL CRUD
  // ===================================

  onAdd(): void {
    this.router.navigate(['/books/new']);
  }

  onEdit(bookId: number): void {
    this.router.navigate(['/books/edit', bookId]);
  }

  onDelete(bookId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      // 💥 Llamar al servicio real y recargar la lista al finalizar
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          console.log(`Libro ${bookId} eliminado con éxito.`);
          this.loadBooks(); // Recargar la lista
        },
        error: (err) => {
          console.error(`Error al eliminar el libro ${bookId}:`, err);
          // Puedes añadir lógica de manejo de errores aquí (ej. mostrar mensaje al usuario)
        }
      });
    }
  }
}