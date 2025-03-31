import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null); // BehaviorSubject para el nombre del usuario
  public userName$ = this.userNameSubject.asObservable(); // Observable para suscribirse al nombre
  private baseUrl = 'http://192.168.113.110:8000/api/';

  constructor(private http: HttpClient) { //instancia para inyectarse en el constructor
    this.userNameSubject.next(this.getUserName());} 

    // -------------------------------------------------------------------- Registro de usuario

    // Registro de usuario
    registerUser(user: User): Observable<any> {
      return this.http.post(`${this.baseUrl}registrar`, user);
    }

    //Código de usuario
    verificarCodigo(email: string, codigo: string): Observable<any> {
      const data = { email, codigo };
      return this.http.post(`${this.baseUrl}verificar-codigo`, data); // URL completa
    }

    //Volver a mandar correo para activar
    resendActivationEmail(user: User): Observable<any> {
      return this.http.post(`${this.baseUrl}reenviar-codigo`, user);
    }

    // -------------------------------------------------------------------- Sesión activa

    // Login de usuario que está actualmente en entrar componente
    entrar(user: User): Observable<any> {
      return this.http.post(`${this.baseUrl}entrar`, user);
    }

    // Método para guardar el token, el rol y el nombre del usuario después del login
    setUserData(token: string, role: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('usuario', username);
    this.userNameSubject.next(username); // Actualizar el BehaviorSubject
  }

    // Método para obtener el nombre del usuario desde el localStorage
    // Se usa en el NavBar y se actualiza en automático
    getUserName(): string | null {
      return localStorage.getItem('usuario');
    }

    getToken(): string {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }
      return token.trim().replace(/^"(.*)"$/, '$1');
    }

    // --------------------------------------------------------------------

  // logout de usuario?
  salir(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token antes de eliminar:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario');
    console.log('Token después de eliminar:', localStorage.getItem('token'));
    this.userNameSubject.next(null);
    return this.http.delete(`${this.baseUrl}salir`, { headers }).pipe(
      catchError(error => {
        console.error('Error al cerrar sesión', error);
        return throwError(error);
      })
    );
  }

// --------------------------------------- para los guards

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Administrador';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
  }

// -------------------------------------------------------------------- para el perfil
    getPuestoService() {
      return this.http.get(`${this.baseUrl}puesto`);
    }

  // Obtener datos del usuario autenticado
  perfilData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}perfil`, { headers });
  }

  // Actualizar datos de usuario
  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token en updateUser:', token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.baseUrl}perfil`, user, { headers });
  }

  //Cambiar contraseña
  changePassword(data: {
    current_password: string,
    new_password: string,
    new_password_confirmation: string
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}resetPassword`, data, { headers });
  }

  // borrar la cuenta propia
deleteAccount(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete(`${this.baseUrl}perfil`, { headers });
}

getAll(endpoint: string): Observable<any> { //para usuarios
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.baseUrl}${endpoint}`, { headers });
}

}
