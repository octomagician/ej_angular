import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface/user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {} //instancia para inyectarse en el constructor

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

  // Registro de usuario
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}v2/registrar`, user);
  }

  // Login de usuario
  loginUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      catchError((error) => {
        console.error('Error en el login', error);
        return of(null);
      })
    );
  }

  // Obtener datos del usuario autenticado
  perfilData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}v2/perfil`, { headers });
  }

  // logout de usuario
  logoutUser(): Observable<any> {
    return this.http.post(`${this.baseUrl}v2/logout`, {});
  }

  // Actualizar datos de usuario
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}v2/perfil`, user);
  }

  //Cambiar contraseña
  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}v2/reset-password`;
    return this.http.post(url, { email });
  }
}
