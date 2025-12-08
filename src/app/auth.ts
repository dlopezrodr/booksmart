import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './models/login-response'; 
import { UserCredentials } from './models/user-credentials'; // Creamos un modelo para las credenciales, opcional pero buena práctica

@Injectable({
  providedIn: 'root'
})
// Asumiendo que esta es tu clase principal, que usarás como AuthService
export class AuthService { 
  // URL de login definida en Symfony (ruta /api/login)
  private loginUrl = 'http://backend/api/login'; 
  
  // Clave para guardar el token
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) { }

  /**
   * Intenta autenticar al usuario enviando las credenciales a Symfony.
   * Tipado: Observable<LoginResponse> para resolver el error ts(7006).
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const credentials = { username, password };
    
    // El .post<LoginResponse> tipa la respuesta que se espera
    return this.http.post<LoginResponse>(this.loginUrl, credentials)
      .pipe(
        // Utiliza 'tap' para ejecutar código side-effect (guardar el token)
        tap((response: LoginResponse) => {
          this.saveToken(response.token);
        })
      );
  }

  /**
   * Guarda el token JWT en el almacenamiento local (localStorage).
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Obtiene el token guardado.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Verifica si el usuario está logueado basándose en la existencia del token.
   * En un proyecto real, también se debe verificar la caducidad del token.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Elimina el token del almacenamiento local para cerrar la sesión.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}