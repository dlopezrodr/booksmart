// src/app/books/book.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo completo para el servicio
export interface Book {
  id: number; // 💥 Añadir ID
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  // Agrega aquí otras propiedades si son necesarias (ej. editorialId)
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Asegúrate de que esta URL apunta a tu contenedor Docker (proxy o host/puerto)
  // Si usas el proxy de Angular, la URL debería ser '/api/libros'
  private apiUrl = 'http://localhost:8000/api/libros'; 

  constructor(private http: HttpClient) {}

  // ===================================
  // R - READ (ALL)
  // ===================================
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // ===================================
  // R - READ (SINGLE)
  // ===================================
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // ===================================
  // C - CREATE
  // ===================================
  createBook(bookData: Omit<Book, 'id'>): Observable<Book> {
    // Omit<Book, 'id'>: El backend genera el ID, no lo enviamos en el POST
    return this.http.post<Book>(this.apiUrl, bookData);
  }

  // ===================================
  // U - UPDATE
  // ===================================
  updateBook(id: number, bookData: Partial<Book>): Observable<Book> {
    // Partial<Book>: Solo enviamos los campos que se modifican
    return this.http.put<Book>(`${this.apiUrl}/${id}`, bookData);
  }

  // ===================================
  // D - DELETE
  // ===================================
  deleteBook(id: number): Observable<void> {
    // El DELETE generalmente devuelve un Observable<void> o un Observable<any>
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}