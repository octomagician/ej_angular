import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogService } from '../../../service/log/log.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../component/pagination/pagination.component';
import { SseService } from '../../../service/event-source/sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-list',
  imports: [CommonModule, PaginationComponent], // Añade el componente de paginación aquí
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
})
export class LogListComponent implements OnInit, OnDestroy {
  logs: any[] = []; // Lista completa de logs
  filteredLogs: any[] = []; // Lista de logs filtrados/paginados
  isLoading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensaje de error
  isAdminUser: boolean = false; // Verificación de rol
  ssemensaje: any[] = []; // Mensajes del servidor
  private sseSubscription: Subscription | null = null;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private logService: LogService,
    private authService: AuthService,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario es administrador
    this.isAdminUser = this.authService.isAdmin();

    // Cargar los logs
    this.loadLogs();

    this.sseSubscription = this.sseService
      .getServerSentEvent('http://localhost:8000/api/sse')
      .subscribe({
        next: (event: MessageEvent) => {
          this.ssemensaje.push(JSON.parse(event.data));
        },
        error: (error) => {
          console.error('Error en SSE:', error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }

  // Cargar los logs desde el backend
  loadLogs(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.logService.getLogs().subscribe(
      (data: any[]) => {
        // orden b a, más reciente primero
        this.logs = data.sort((a, b) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        this.filteredLogs = this.logs; // Asignar los logs ordenados
        this.calculateTotalPages();
        this.updateDisplayedLogs();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los logs.';
        this.isLoading = false;
      }
    );
  }

  // Calcular el número total de páginas
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
  }

  // Actualizar los logs mostrados según la página actual
  updateDisplayedLogs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredLogs = this.logs.slice(startIndex, endIndex);
  }

  // Cambiar de página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedLogs();
    }
  }
}