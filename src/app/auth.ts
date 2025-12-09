import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // 1. Importar BehaviorSubject
import { tap, map } from 'rxjs/operators';
// Importamos la interfaz para la respuesta del login.
import { LoginResponse } from './models/login-response'; 
// Importamos la interfaz para las credenciales.
import { UserCredentials } from './models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  
  private readonly loginUrl = 'http://localhost:8000/api/login_check'; 
  private readonly TOKEN_KEY = 'jwt_token';

  // =============================================
  // 💥 ESTADO REACTIVO (BehaviorSubject)
  // =============================================
  
  // 1. BehaviorSubject para el estado de login. Se inicializa al verificar el token.
  private readonly _isLoggedIn = new BehaviorSubject<boolean>(false);
  // Exponemos el estado como un Observable público que el HeroComponent consume.
  public readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();
  
  // 2. BehaviorSubject para el nombre del usuario (se extrae del token o se simula).
  private readonly _currentUserName = new BehaviorSubject<string>('Invitado');
  
  constructor(private http: HttpClient) {
    // Verificar el token al iniciar el servicio
    if (this.getToken()) {
        this._isLoggedIn.next(true);
        // Simulación: establecer el nombre al inicio si hay token
        // En producción, aquí decodificarías el JWT para obtener el nombre real.
        this._currentUserName.next(this.extractUsernameFromToken() || 'Usuario');
    }
  }

  // =============================================
  // MÉTODOS DE AUTENTICACIÓN
  // =============================================
  
  /**
   * Intenta autenticar al usuario enviando un objeto UserCredentials a Symfony.
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const credentials: UserCredentials = { username, password };
    
    return this.http.post<LoginResponse>(this.loginUrl, credentials)
      .pipe(
        // Almacena el token y actualiza el estado REACTIVO.
        tap((response: LoginResponse) => {
          this.saveToken(response.token);
          this._isLoggedIn.next(true); // 💥 Actualiza el BehaviorSubject
          this._currentUserName.next(username); // 💥 Actualiza el nombre (simulación)
        })
      );
  }

  /**
   * Elimina el token del almacenamiento local y actualiza el estado.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._isLoggedIn.next(false); // 💥 Actualiza el BehaviorSubject
    this._currentUserName.next('Invitado'); // 💥 Resetea el nombre
  }
  
  // =============================================
  // GETTERS DE ESTADO PARA EL HEROCOMPONENT
  // =============================================
  
  /**
   * 💥 Método requerido por HeroComponent: Obtiene el nombre del usuario como Observable.
   */
  public getCurrentUserName(): Observable<string> {
    return this._currentUserName.asObservable();
  }

  /**
   * (Opcional) Método para simular la extracción del nombre del token.
   * En producción, usarías una librería para decodificar el JWT.
   */
  private extractUsernameFromToken(): string | null {
      // Lógica de decodificación de JWT aquí
      // Por ahora, solo devuelve un valor simulado
      return 'Admin'; 
  }

  // =============================================
  // MÉTODOS PRIVADOS DE MANEJO DE TOKEN
  // =============================================

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // isLoggedin() ya no se necesita como método, usamos el Observable isLoggedIn$
}