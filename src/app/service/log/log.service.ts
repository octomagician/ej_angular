import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://127.0.0.1:8000/api/logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ logs: any[] }>(this.apiUrl, { headers }).pipe(
      map(response => response.logs)
    );
  }
}