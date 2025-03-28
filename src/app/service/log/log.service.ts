import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { fetchEventSource } from '@microsoft/fetch-event-source';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://127.0.0.1:8000/api/logs';
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private zone: NgZone
  ) {}

  getLogs(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ logs: any[] }>(this.apiUrl, { headers }).pipe(
      map(response => response.logs)
    );
  }

  // Conexión SSE optimizada
  conectarEventos(): Observable<any> {
    return new Observable(observer => {
      const token = this.authService.getToken();
      const abortController = new AbortController();
      let reconexionIntentos = 0;
      const maxReconexiones = 5;

      const conectar = () => {
        fetchEventSource(`${this.baseUrl}eventos-sse`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'text/event-stream'
          },
          signal: abortController.signal,
          onopen: async (response) => {
            reconexionIntentos = 0; // Resetear contador de reconexiones
            if (!response.ok || response.status === 401) {
              throw new Error(response.status === 401 ? 
                'No autorizado' : `Error ${response.status}`);
            }
            console.log('Conexión SSE establecida');
          },
          onmessage: (event) => {
            this.zone.run(() => {
              try {
                // Procesar solo si es evento newLog y no es heartbeat
                if (event.event === 'newLog' && event.data !== 'heartbeat') {
                  const data = JSON.parse(event.data);
                  console.debug('Evento SSE recibido:', data); // debug en lugar de log
                  observer.next(data);
                }
              } catch (e) {
                console.error('Error procesando evento:', e);
              }
            });
          },
          onerror: (err) => {
            this.zone.run(() => {
              console.error('Error SSE:', err);
              if (reconexionIntentos++ < maxReconexiones) {
                console.log(`Reintentando conexión (${reconexionIntentos}/${maxReconexiones})`);
                setTimeout(conectar, 3000 * reconexionIntentos);
              } else {
                observer.error('Maximos reintentos alcanzados');
                abortController.abort();
              }
            });
          }
        });
      };

      conectar(); // Iniciar la primera conexión

      return () => {
        console.log('Limpiando conexión SSE');
        abortController.abort();
      };
    });
  }
}