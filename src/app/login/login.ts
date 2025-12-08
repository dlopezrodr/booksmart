import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth'; // Servicio de autenticación
import { ReactiveFormsModule } from '@angular/forms'; // <-- ¡IMPORTAR AQUÍ!

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        // <-- ¡SOLUCIONA NG8103 (*ngIf)!
    ReactiveFormsModule, // <-- ¡SOLUCIONA NG8002 ([formGroup])!
    RouterModule         
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null; // Para mostrar errores de credenciales

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si el usuario ya está autenticado, redirigir a la página principal
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    this.error = null; // Limpiar errores anteriores

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        
        // 1. Manejo Exitoso (Success)
        next: (response) => {
          // Si el login fue exitoso, el token ya está guardado por el AuthService.
          console.log('Login successful, token received:', response.token);
          
          // Navegar a la página principal (o a una página de dashboard)
          this.router.navigate(['/']); 
        },

        // 2. Manejo de Errores (Error)
        error: (err) => {
          console.error('Login error:', err);
          
          // El backend de Symfony/JWT devuelve un error 401 si las credenciales son inválidas.
          // Usamos un mensaje genérico por seguridad.
          this.error = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
          
          // Opcional: limpiar la contraseña después de un fallo
          this.loginForm.controls['password'].reset();
        }
      });
    } else {
      // Si el formulario no es válido (ej. campos vacíos)
      this.error = 'Por favor, introduce el nombre de usuario y la contraseña.';
    }
  }
}