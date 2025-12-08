import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth'; // Servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class login implements OnInit {
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
        next: (response) => {
          // Asumimos que la respuesta exitosa incluye un token o similar
          console.log('Login exitoso', response);
          this.router.navigate(['/home']); // Redirigir después del éxito
        },
        error: (err) => {
          // Symfony devuelve típicamente un error 401 si las credenciales son incorrectas
          this.error = 'Credenciales inválidas. Inténtalo de nuevo.';
          console.error('Error de autenticación:', err);
        }
      });
    } else {
      this.error = 'Por favor, introduce tu usuario y contraseña.';
    }
  }
}