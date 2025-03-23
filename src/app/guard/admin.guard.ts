import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}