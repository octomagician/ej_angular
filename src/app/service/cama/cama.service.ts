import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cama } from '../../interface/cama';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CamaService {
  private apiUrl = 'http://127.0.0.1:8000/api/cama';

  constructor(private http: HttpClient) {}

  // Obtener todas las camas
  getCamas(): Observable<Cama[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ camas: Cama[] }>(this.apiUrl, { headers }).pipe(
      map(response => response.camas) // Extrae el array 'camas' de la respuesta
    );
  }
  

  // Obtener una cama por ID
  getCamaById(id: number): Observable<Cama> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cama>(`${this.apiUrl}/${id}`, { headers });
}

  // Crear una cama
  createCama(cama: Cama): Observable<Cama> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Cama>(this.apiUrl, cama, { headers });
}

  // Actualizar una cama
  updateCama(id: number, cama: Cama): Observable<Cama> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Cama>(`${this.apiUrl}/${id}`, cama, { headers });
}

  // Eliminar una cama (soft delete)
  deleteCama(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}
}