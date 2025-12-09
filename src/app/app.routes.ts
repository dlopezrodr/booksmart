import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { LoginComponent } from './login/login'; // Asumiendo que ya tienes este componente
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './books/create-book/create-book'; 
import { EditBookComponent } from './books/edit-book/edit-book';

export const routes: Routes = [
    // 1. Ruta principal (Hero Page)
    { path: '', component: HeroComponent }, 

    // 2. Ruta de Login (para el botón)
    { path: 'login', component: LoginComponent }, 

    { path: 'books', component: BookListComponent }, // Ruta principal de la lista
    { path: 'books/new', component: CreateBookComponent },
    { path: 'books/edit/:id', component: EditBookComponent },

    { path: '**', redirectTo: '' },
];