import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-historial-list',
  imports: [GenericListComponent],
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.css'],
})
export class HistorialListComponent implements OnInit {
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdminUser = isAdmin; // Actualizar la variable con el valor emitido por el Observable
    });
}
}