import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-estudio-list',
  imports: [GenericListComponent],
  templateUrl: './estudio-list.component.html',
  styleUrls: ['./estudio-list.component.css'],
})
export class EstudioListComponent implements OnInit {
  isAdminUser: boolean = false;

  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'tipo_estudio', label: 'Tipo de Estudio' },
    { key: 'personal', label: 'Personal' },
    { 
      key: 'fecha', 
      label: 'Fecha',
      type: 'date', // Tipo para identificar que es una fecha
      format: 'dd/MM/yyyy HH:mm' // Formato deseado
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();
  }
}