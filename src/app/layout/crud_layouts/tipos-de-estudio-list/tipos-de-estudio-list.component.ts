import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-tipos-de-estudio-list',
  imports: [GenericListComponent],
  templateUrl: './tipos-de-estudio-list.component.html',
  styleUrls: ['./tipos-de-estudio-list.component.css'],
})
export class TiposDeEstudioListComponent implements OnInit {
  isAdminUser: boolean = false;

  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();
  }
}