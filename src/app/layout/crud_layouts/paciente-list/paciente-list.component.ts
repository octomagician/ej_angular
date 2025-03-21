import { Component, OnInit } from '@angular/core';
import { DualTableListComponent } from '../../../component/dual-table-list/dual-table-list.component';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-list',
  imports: [DualTableListComponent],
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css'],
})
export class PacienteListComponent implements OnInit {
  isAdminUser: boolean = false;

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido_paterno', label: 'Apellido Paterno' },
    { key: 'nacimiento', label: 'Fecha de Nacimiento' },
    { key: 'nss', label: 'NSS' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();
  }
}