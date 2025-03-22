import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor(private http: HttpClient) {}

  getServerSentEvent(url: string): Observable<MessageEvent> {
    return new Observable(observer => {
      const token = localStorage.getItem('token');
      
      // Si necesitas enviar el token en la URL como parámetro de consulta
      const eventSourceUrl = `${url}?token=${token}`;
      
      const eventSource = new EventSource(eventSourceUrl);

      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        console.error('Error en EventSource:', error);
        observer.error(error);
        eventSource.close();
      };

      // Cerrar la conexión cuando el observable se cancela
      return () => {
        eventSource.close();
      };
    });
  }
}