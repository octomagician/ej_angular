import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuestoResponse } from '../../interface/PuestoResponse';

@Injectable({
  providedIn: 'root'
})

export class PuestoService {
  private apiUrl = 'http://127.0.0.1:8000/api/v2/puesto';

  constructor(private http: HttpClient) {}

  getPuestoService(): Observable<PuestoResponse> {
    return this.http.get<PuestoResponse>(this.apiUrl);
  }
}
