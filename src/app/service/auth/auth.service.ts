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








    // Método para obtener el nombre del usuario desde el localStorage
    getUserName(): string | null {
      return localStorage.getItem('usuario');
    }

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials).pipe(
      catchError((error) => {
        console.error('Error en el login:', error);
        return of(null);
      })
    );
  }

  // Método para guardar el token, el rol y el nombre del usuario después del login
  setUserData(token: string, role: string, name: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('usuario', name);
    this.userNameSubject.next(name); // Actualizar el BehaviorSubject
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario'); 
    this.userNameSubject.next(null);
  }

// ---------------------------------------

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Administrador';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe
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



  //----------------------------
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
