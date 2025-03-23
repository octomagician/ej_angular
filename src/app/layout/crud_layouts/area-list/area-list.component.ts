import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
  selector: 'app-area-list',
  imports: [GenericListComponent],
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
})
export class AreaListComponent implements OnInit {
  isAdminUser: boolean = false;

  // Columnas para la tabla
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre del Área' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdminUser = isAdmin; // Actualizar la variable con el valor emitido por el Observable
    });
}
}