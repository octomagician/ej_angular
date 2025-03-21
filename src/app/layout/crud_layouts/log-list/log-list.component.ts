import { Component, OnInit } from '@angular/core';
import { LogService } from '../../../services/log/log.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-list',
  imports: [CommonModule],
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
})
export class LogListComponent implements OnInit {
  logs: any[] = []; // Lista de logs
  isLoading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensaje de error
  isAdminUser: boolean = false; // Verificación de rol

  constructor(
    private logService: LogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();

    // Cargar los logs
    this.loadLogs();
  }

  // Cargar los logs desde el backend
  loadLogs(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.logService.getLogs().subscribe(
      (logs: any[]) => {
        this.logs = logs; // Asignar los logs a la variable
        this.isLoading = false;
        //console.log('Logs cargados:', this.logs);
      },
      (error) => {
        this.errorMessage = 'Error al cargar los logs.';
        this.isLoading = false;
        //console.error('Error al cargar los logs:', error);
      }
    );
  }
}