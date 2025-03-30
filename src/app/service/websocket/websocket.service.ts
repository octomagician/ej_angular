import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private pusher: Pusher;
  private channel: any;

  constructor() {
    // Configuración para desarrollo local con Soketi
    this.pusher = new Pusher('app-key', {  // Debe coincidir con PUSHER_APP_KEY en tu .env
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
      cluster: 'mt1',
      disableStats: true
    });
  }

  listenToHistorial(callback: (data: any) => void): void {
    this.channel = this.pusher.subscribe('historial');
    this.channel.bind('historial.refresh', (data: any) => {
        console.log('Evento recibido:', data);
        callback(data);
    });
    
    // Logs de conexión
    this.pusher.connection.bind('connected', () => {
        console.log('Conectado a WebSockets');
    });
    
    this.pusher.connection.bind('error', (err: any) => {
        console.error('Error en conexión WebSocket:', err);
    });
}

  // Método para desconectar
  disconnect(): void {
    if (this.pusher) {
      this.pusher.disconnect();
    }
  }
}