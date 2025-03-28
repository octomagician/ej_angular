// ESTE YA NO PORQUE PUSE EL POLYFILL 




import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {
  constructor(private zone: NgZone) {}

  getServerSentEvents(url: string, token: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${url}?token=${token}`);

      // Escucha eventos específicos
    eventSource.addEventListener('newLog', (event: MessageEvent) => {
      this.zone.run(() => {
        try {
          observer.next(JSON.parse(event.data));
        } catch (e) {
          observer.error('Error parsing SSE data');
        }
      });
    });

    eventSource.onerror = (error) => {
      this.zone.run(() => {
        if (eventSource.readyState === EventSource.CLOSED) {
          observer.complete();
        } else {
          observer.error(error);
        }
      });
    };

      return () => {
        eventSource.close();
      };
    });
  }
}