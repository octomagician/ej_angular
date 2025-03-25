import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface/user';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null); // BehaviorSubject para el nombre del usuario
  public userName$ = this.userNameSubject.asObservable(); // Observable para suscribirse al nombre
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para el estado de autenticación
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable para suscribirse al estado de autenticación
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {
    this.checkAuthentication().subscribe(); // Verificar el estado de autenticación al inicializar el servicio
  }

  // -------------------------------------------------------------------- Registro de usuario

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}registrar`, user, { withCredentials: true });
  }

  verificarCodigo(email: string, codigo: string): Observable<any> {
    const data = { email, codigo };
    return this.http.post(`${this.baseUrl}verificar-codigo`, data, { withCredentials: true });
  }

  resendActivationEmail(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}reenviar-codigo`, user, { withCredentials: true });
  }

  // -------------------------------------------------------------------- Sesión activa

  entrar(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}entrar`, user, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(error);
      }),
      tap((response: any) => {
        // Actualizar el estado de autenticación y el nombre del usuario
        this.isAuthenticatedSubject.next(true);
        this.setUserName(response.username);
        console.log('Desde auth.service, entrar, Usuario autenticado:', response.username);
        console.log('Desde auth.service, entrar, Estado de autenticación:', this.isAuthenticatedSubject.value);
      })
    );
  }

  // Método para guardar el nombre del usuario después del login
  setUserName(username: string): void {
    this.userNameSubject.next(username); // Actualizar el BehaviorSubject
  }

  // Método para obtener el nombre del usuario desde el backend
  getUserName(): string | null {
    return this.userNameSubject.value; // Obtener el valor actual del BehaviorSubject
  }

  // -------------------------------------------------------------------- Logout

  salir(): Observable<any> {
    return this.http.delete(`${this.baseUrl}salir`, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        return throwError(error);
      }),
      tap(() => {
        // Limpiar el estado de autenticación y el nombre del usuario
        this.isAuthenticatedSubject.next(false);
        this.userNameSubject.next(null);
      })
    );
  }

  // --------------------------------------- Para los guards

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}es-admin`, { withCredentials: true });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}esta-autenticado`, { withCredentials: true });
  }

  // Verificar el estado de autenticación al cargar la aplicación
  checkAuthentication(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}esta-autenticado`, { withCredentials: true }).pipe(
      tap((isAuthenticated: boolean) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
      }),
      catchError((error) => {
        this.isAuthenticatedSubject.next(false);
        return throwError(error);
      })
    );
  }

  // -------------------------------------------------------------------- Para el perfil

  perfilData(): Observable<any> {
    return this.http.get(`${this.baseUrl}v2/perfil`, { withCredentials: true });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}v2/perfil`, user, { withCredentials: true });
  }

  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}v2/reset-password`;
    return this.http.post(url, { email }, { withCredentials: true });
  }

  // ---------------------------- PASARLO A SU PROPIO SERVICIO

  registerPaciente(pacienteData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v2/paciente`, pacienteData, { withCredentials: true });
  }

  getPacienteByNss(nss: string): Observable<any> {
    return this.http.get(`${this.baseUrl}v2/paciente/${nss}`, { withCredentials: true });
  }

  updatePaciente(nss: string, pacienteData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}v2/paciente/${nss}`, pacienteData, { withCredentials: true });
  }
}