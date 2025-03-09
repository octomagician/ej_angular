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
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {} //instancia para inyectarse en el constructor

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        return of(null);
      })
    );
  }

  // Método para guardar el token y el rol del usuario después del login
  setUserData(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Almacenar el rol del usuario
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Eliminar el rol al cerrar sesión
  }

// ---------------------------------------

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

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
    return this.http.post(`${this.baseUrl}login`, user);
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
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crear headers con el token
    return this.http.put(`${this.baseUrl}v2/perfil`, user, { headers }); // Enviar la solicitud con los headers
  }

  //Cambiar contraseña
  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}v2/reset-password`;
    return this.http.post(url, { email });
  }

  //Volver a mandar correo para activar
  resendActivationEmail(user: User): Observable<any> {
    return this.http.post('${this.baseUrl}resend-activation', user);
  }

  //----------------------------
  registerPaciente(pacienteData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}v2/paciente`, pacienteData, { headers });
  }
}
