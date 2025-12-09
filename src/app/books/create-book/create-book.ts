// src/app/books/create-book/create-book.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // 👈 Formulario reactivo
import { Router } from '@angular/router';
import { BookService } from '../book.service'; // 👈 Asumimos que tienes este servicio

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-book.html',
  styleUrls: ['./create-book.css']
})
export class CreateBookComponent implements OnInit {
  
  bookForm!: FormGroup;
  error: string | null = null;

  // Inyectamos FormBuilder y Router (y el BookService real)
  constructor(
    private fb: FormBuilder,
    public router: Router,
    // private bookService: BookService 
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9-xX]{10,17}$')]], // ISBN básico
      publicationDate: [new Date().toISOString().substring(0, 10), Validators.required] // Fecha por defecto
    });
  }

  // Getter para facilitar el acceso a los controles del formulario en el HTML
  get f() { return this.bookForm.controls; }
  
onSubmit(): void {
    this.error = null;

    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched(); // Muestra mensajes de error
      this.error = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    // ⚠️ Descomentar cuando el servicio sea real:
    /*
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: (response) => {
        console.log('Libro creado con éxito:', response);
        // Redirigir a la lista de libros después de la creación exitosa
        this.router.navigate(['/books']); 
      },
      error: (err) => {
        console.error('Error al crear el libro:', err);
        // Mensaje de error genérico o específico (ej: 409 Conflict si ya existe ISBN)
        this.error = 'Error al guardar el libro. Inténtalo de nuevo.';
      }
    });
    */

    // --- SIMULACIÓN (Eliminar después) ---
    console.log('Libro a crear:', this.bookForm.value);
    this.router.navigate(['/books']);
  // -------------------------------------
}
}