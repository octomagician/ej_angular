import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-diagnostico-list',
  imports: [GenericListComponent],
  templateUrl: './diagnostico-list.component.html',
  styleUrls: ['./diagnostico-list.component.css'],
})
export class DiagnosticoListComponent implements OnInit {
  isAdminUser: boolean = false;

  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'dx', label: 'Diagnóstico' },
    { key: 'estatus', label: 'Estatus' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();
  }
}