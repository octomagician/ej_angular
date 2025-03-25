import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map((idAdmin) => {
        if (idAdmin) {
          console.log('AuthGuard: Administrador, acceso permitido');
          return true;
        } else {
          console.log('AuthGuard: No es admin, redirigiendo a /entrar');
          this.router.navigate(['/entrar']);
          return false;
        }
      }),
      catchError(() => {
        console.error('AuthGuard: Error al verificar si es admin', Error);
        this.router.navigate(['/entrar']);
        return of(false);
      })
    );
  }
}