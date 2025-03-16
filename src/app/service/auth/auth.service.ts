import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface/user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null); // BehaviorSubject para el nombre del usuario
  public userName$ = this.userNameSubject.asObservable(); // Observable para suscribirse al nombre
  private baseUrl = 'http://127.0.0.1:8000/api/';

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

    // NO SÉ DÓNDE ESTOY USANDO ESTE??????????? creo que lo borraré si no lo descubro el domingo en la noche
    // Método para iniciar sesión
    /*
    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post(`${this.baseUrl}entrar`, credentials).pipe(
        catchError((error) => {
          console.error('Error en el login:', error);
          return of(null);
        })
      );
    }*/

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

    // --------------------------------------------------------------------




  // Método para cerrar sesión, creo que estoy usando este ahorita
  /*logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario'); 
    this.userNameSubject.next(null);
  }*/

  // logout de usuario?????? otro???????????? pero este debe ser el correcto porque usa la dirección de la api
  salir(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario'); 
    this.userNameSubject.next(null);
    return this.http.post(`${this.baseUrl}salir`, {});
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

  // Obtener datos del usuario autenticado
  perfilData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}v2/perfil`, { headers });
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

  //---------------------------- PASARLO A SU PROPIO SERVICIO
  registerPaciente(pacienteData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}v2/paciente`, pacienteData, { headers });
  }

    // Método para obtener un paciente por su NSS
    getPacienteByNss(nss: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.get(`${this.baseUrl}v2/paciente/${nss}`, { headers });
    }
  
    // Método para actualizar un paciente
    updatePaciente(nss: string, pacienteData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.put(`${this.baseUrl}v2/paciente/${nss}`, pacienteData, { headers });
    }

    

}
