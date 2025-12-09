// src/app/auth.interceptor.ts (Ejemplo de Interceptor Funcional)

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtener el token del almacenamiento local (o de tu servicio de autenticación)
  const token = localStorage.getItem('access_token'); 

  // 2. Si hay token y la URL es la API de Symfony (no /login_check)
  if (token) {
    // 3. Clonar la petición y añadir la cabecera Authorization
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(cloned);
  }

  // Si no hay token, o si la URL es /login_check, continuar con la petición original
  return next(req);
};