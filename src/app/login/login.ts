import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth'; // Servicio de autenticación
import { ReactiveFormsModule } from '@angular/forms';

// 💥 AÑADIDO: Importar operadores necesarios para la verificación reactiva
import { filter, take } from 'rxjs/operators'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        
    ReactiveFormsModule, 
    RouterModule         
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 💥 CORRECCIÓN: Usar el Observable isLoggedIn$ para verificar el estado
    this.authService.isLoggedIn$
      .pipe(
        // 1. Solo deja pasar valores cuando el usuario SÍ esté logueado (true)
        filter(isLoggedIn => isLoggedIn), 
        // 2. Tomar solo el primer valor que cumpla la condición y luego cancelar la suscripción
        take(1) 
      )
      .subscribe(() => {
        // 3. Redirigir si la condición se cumple
        this.router.navigate(['/home']);
      });
  }

  onSubmit(): void {
    this.error = null;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        
        // 1. Manejo Exitoso (Success)
        next: (response) => {
          console.log('Login successful, token received:', response.token);
          // La navegación ocurrirá automáticamente porque el Observable isLoggedIn$
          // se actualizará a 'true' en el servicio y el ngOnInit lo interceptará.
          // Sin embargo, es buena práctica forzar la navegación aquí también:
          this.router.navigate(['/']); 
        },

        // 2. Manejo de Errores (Error)
        error: (err) => {
          console.error('Login error:', err);
          
          // Verificar si el error es 401 Unauthorized para mensaje específico
          if (err.status === 401) {
             this.error = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
          } else {
             this.error = 'Ocurrió un error al conectar con el servidor.';
          }
          
          this.loginForm.controls['password'].reset();
        }
      });
    } else {
      this.error = 'Por favor, introduce el nombre de usuario y la contraseña.';
    }
  }
}