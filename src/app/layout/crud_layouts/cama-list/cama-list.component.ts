  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../../../service/auth/auth.service';
  import { Router } from '@angular/router';
  import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

  @Component({
    selector: 'app-cama-list',
    imports: [GenericListComponent],
    templateUrl: './cama-list.component.html',
    styleUrls: ['./cama-list.component.css'],
  })
  export class CamaListComponent implements OnInit {
    isAdminUser: boolean = false;
  
    // Columnas para la tabla
    columns = [
      { key: 'id', label: 'ID' },
      { key: 'numero_cama', label: 'Número de Cama' },
      { key: 'area_id', label: 'Área ID' },
    ];
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      // Verificar si el usuario es administrador
      this.authService.isAdmin().subscribe((isAdmin) => {
        this.isAdminUser = isAdmin; // Actualizar la variable con el valor emitido por el Observable
      });
  }
  }