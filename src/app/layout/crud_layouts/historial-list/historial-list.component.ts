// historial-list.component.ts
import { Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';
import { WebsocketService } from '../../../service/websocket/websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-list',
  standalone: true,
  imports: [GenericListComponent, CommonModule],
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.css'],
})
export class HistorialListComponent implements OnInit, OnDestroy {
  private websocketService = inject(WebsocketService);
  private updatesSub!: Subscription;
  isAdminUser: boolean = false;

  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'ingreso_id', label: 'ID de Ingreso' },
    { key: 'user_id', label: 'ID de Usuario' },
    { key: 'presion', label: 'Presión' },
    { key: 'temperatura', label: 'Temperatura' },
    { key: 'glucosa', label: 'Glucosa' },
    { key: 'sintomatologia', label: 'Sintomatología' },
    { key: 'observaciones', label: 'Observaciones' },
  ];

  // Referencia al componente hijo
  @ViewChild(GenericListComponent) genericList!: GenericListComponent<any>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('[HistorialList] Componente inicializado');
    this.isAdminUser = this.authService.isAdmin();
    console.log(`[HistorialList] isAdminUser: ${this.isAdminUser}`);
}

  ngOnDestroy(): void {
    this.updatesSub?.unsubscribe();
  }
}