import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../service/websocket/websocket.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  showNotifications = false;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
      // Datos de prueba
      /*
      const testData = {
        action: 'created',
        historial: {
          id: 999,
          // ...otros campos
        },
        timestamp: new Date().toISOString()
      };
      this.handleHistorialEvent(testData);
      */
      // Terminan datos de prueba

    this.setupWebSocketListeners();
  }

  private setupWebSocketListeners(): void {
    this.websocketService.listenToHistorial((data: any) => {
      this.handleHistorialEvent(data);
    });
  }

  private handleHistorialEvent(data: any): void {
    console.log('Datos recibidos:', data);
    
    // Extraer los campos según la estructura real
    const action = data?.action || 'change'; // 'updated', 'created', 'deleted'
    const itemId = data?.id || 'N/A';
    const timestamp = data?.timestamp || new Date().toISOString();
  
    // Mensajes específicos para cada acción
    const messages: any = {
      created: `Nuevo registro creado (ID: ${itemId})`,
      updated: `Registro actualizado (ID: ${itemId})`,
      deleted: `Registro eliminado (ID: ${itemId})`,
      default: `Cambio en historial (ID: ${itemId})`
    };
    
    const message = messages[action] || messages.default;
    
    this.notifications.unshift({
      message,
      timestamp: new Date(timestamp),
      type: action,
      rawData: data // Opcional: guardar datos originales para debug
    });
  
    // Limitar a 10 notificaciones
    if (this.notifications.length > 10) {
      this.notifications.pop();
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}