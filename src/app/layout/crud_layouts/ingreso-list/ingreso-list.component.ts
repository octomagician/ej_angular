import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-ingreso-list',
  imports: [GenericListComponent],
  templateUrl: './ingreso-list.component.html',
  styleUrls: ['./ingreso-list.component.css'],
})
export class IngresoListComponent implements OnInit {
  isAdminUser: boolean = false;

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'pacientes_id', label: 'Paciente' },
    { key: 'diagnostico_id', label: 'Diagnóstico' },
    { key: 'camas_id', label: 'Cama' },
    { key: 'user_id', label: 'Personal' },
    { key: 'fecha_ingreso', label: 'Fecha de Ingreso' },
    { key: 'motivo_ingreso', label: 'Motivo de Ingreso' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
  }
}