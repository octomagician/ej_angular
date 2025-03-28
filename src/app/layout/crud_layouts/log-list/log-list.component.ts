import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LogService } from '../../../service/log/log.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../component/pagination/pagination.component';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-log-list',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
})
export class LogListComponent implements OnInit, OnDestroy {
  private eventosSubscription!: Subscription;
  logs: any[] = [];
  filteredLogs: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isAdminUser: boolean = false;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private logService: LogService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.loadInitialLogs();
    this.setupSSEConnection();
  }

  loadInitialLogs(): void {
    this.isLoading = true;
    this.logService.getLogs().subscribe({
      next: (data) => {
        this.logs = data.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.updateView();
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar actualización
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar logs iniciales';
        this.isLoading = false;
      }
    });
  }

  setupSSEConnection(): void {
    this.eventosSubscription = this.logService.conectarEventos().pipe(
      distinctUntilChanged((prev, curr) => prev._id === curr._id)
    ).subscribe({
      next: (newLog) => {
        console.log('Nuevo log recibido:', newLog);
        console.log('Logs antes:', this.logs); // Debug 1
        
        // Filtra duplicados y añade al inicio
        if (!this.logs.some(log => log._id === newLog._id)) {
          this.logs.unshift(newLog);
          
          // Limita a 100 registros máximo
          if (this.logs.length > 100) {
            this.logs = this.logs.slice(0, 100);
          }
          
          this.updateView();
          console.log('Logs después:', this.logs); // Debug 2
          this.cdr.detectChanges(); // Forzar actualización
        }
      },
      error: (err) => {
        console.error('Error SSE:', err);
        this.errorMessage = 'Error en conexión en tiempo real';
        this.cdr.detectChanges();
      }
    });
  }

  updateView(): void {
    this.calculateTotalPages();
    this.updateDisplayedLogs();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.logs.length / this.itemsPerPage);
  }

  updateDisplayedLogs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredLogs = [...this.logs.slice(startIndex, endIndex)]; // Crear nuevo array
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedLogs();
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.eventosSubscription) {
      this.eventosSubscription.unsubscribe();
    }
  }

  trackById(index: number, log: any): string {
    return log._id; // Mejor rendimiento para *ngFor
  }
}