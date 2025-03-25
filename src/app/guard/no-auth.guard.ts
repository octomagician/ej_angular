import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Guard NoAuthGuard llamado. Comprobando si el usuario está autenticado...');
    
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          console.log('Usuario no autenticado. Permitiendo acceso...');
          return true; // Permitir acceso si el usuario no está autenticado
        } else {
          console.log('Usuario autenticado. Redirigiendo al inicio...');
          this.router.navigate(['/inicio']); // Redirigir al inicio si el usuario está autenticado
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error en la autenticación. Redirigiendo al inicio...', error);
        this.router.navigate(['/inicio']); // Redirigir al inicio en caso de error
        return of(false);
      })
    );
  }
}