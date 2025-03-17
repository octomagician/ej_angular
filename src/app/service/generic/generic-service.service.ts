import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Obtener todos los registros
  getAll(endpoint: string): Observable<T[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ [key: string]: T[] }>(`${this.apiUrl}/${endpoint}`, { headers }).pipe(
      map(response => response[endpoint]) // Extrae el array de la respuesta
    );
  }

  // Obtener un registro por ID
  getById(endpoint: string, id: number): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, { headers });
  }

  // Crear un registro
  create(endpoint: string, data: T): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

  // Actualizar un registro
  update(endpoint: string, id: number, data: T): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data, { headers });
  }

  // Eliminar un registro
  delete(endpoint: string, id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`, { headers });
  }
}