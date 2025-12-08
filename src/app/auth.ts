import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Importamos la interfaz para la respuesta del login.
import { LoginResponse } from './models/login-response'; 
// Importamos la interfaz para las credenciales.
import { UserCredentials } from './models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  // 1. CORRECCIÓN: Usar la ruta de verificación JWT configurada en security.yaml
  //    (Si estás usando Docker, 'backend' no funciona; debes usar 'http://localhost:8000'
  //     o la dirección IP de tu contenedor Symfony si lo accedes desde el host.)
  private readonly loginUrl = 'http://localhost:8000/api/login_check'; 
  
  // Clave para guardar el token
  private readonly TOKEN_KEY = 'jwt_token'; // Usamos jwt_token por convención

  constructor(private http: HttpClient) { }

  /**
   * Intenta autenticar al usuario enviando un objeto UserCredentials a Symfony.
   */
  login(username: string, password: string): Observable<LoginResponse> {
    // 2. CREACIÓN DEL OBJETO: Crear el objeto de credenciales.
    const credentials: UserCredentials = { username, password };
    
    // 3. LLAMADA POST: Envía el objeto a /api/login_check
    return this.http.post<LoginResponse>(this.loginUrl, credentials)
      .pipe(
        // Almacena el token de la respuesta exitosa.
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