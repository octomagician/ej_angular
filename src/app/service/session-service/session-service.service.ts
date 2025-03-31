import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LogService } from '../log/log.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private authService: AuthService,
    private logService: LogService
  ) {}

  logout(): Observable<any> {
    console.log('Cerrando conexiones SSE');
    this.logService.cerrarConexionesSSE();
    return this.authService.salir();
  }
}