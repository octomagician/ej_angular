import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('AuthGuard: Usuario autenticado, acceso permitido');
          return true;
        } else {
          console.log('AuthGuard: Usuario no autenticado, redirigiendo a /entrar');
          this.router.navigate(['/entrar']);
          return false;
        }
      }),
      catchError(() => {
        console.error('AuthGuard: Error al verificar autenticación', Error);
        this.router.navigate(['/entrar']);
        return of(false);
      })
    );
  }
}