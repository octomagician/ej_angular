import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { GenericService } from '../../../service/generic/generic-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../component/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {
  // Datos
  pacientes: any[] = [];
  displayedPacientes: any[] = [];
  
  // Permisos
  isAdminUser: boolean = false;
  
  // Búsqueda
  searchId: number | null = null;
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  
  // Endpoint API
  private readonly endpoint = 'pacientes';

  constructor(
    private authService: AuthService,
    private genericService: GenericService<any>,
    private router: Router
  ) {}

  //POLLEO
  private pollingInterval: any;
  private readonly POLLING_INTERVAL = 30000; // 30 segundos

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.loadPacientes();
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.loadPacientes();
    }, this.POLLING_INTERVAL);
  }
  
  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  loadPacientes(): void {
    this.genericService.getAll(this.endpoint).subscribe(
      (response: any) => {
        this.pacientes = response.map((item: any) => item.paciente);
        this.calculateTotalPages();
        this.updateDisplayedItems();
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

// Buscar por ID exacto
searchItem(): void {
    if (this.searchId) {
      // Convertir ambos valores a número para comparación exacta
      this.displayedPacientes = this.pacientes.filter(paciente => 
        paciente.id === Number(this.searchId)
      );
      this.currentPage = 1;
      this.calculateTotalPages();
    } else {
      // Si no hay búsqueda, mostrar todos los pacientes paginados
      this.displayedPacientes = [...this.pacientes];
      this.updateDisplayedItems();
    }
  }

  // Eliminar un paciente
  deleteItem(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este paciente?');
    if (confirmacion) {
      this.genericService.delete(this.endpoint, id).subscribe({
        next: () => {
          this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);
          this.updateDisplayedItems();
          alert('Paciente eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar paciente:', err);
          alert('Error al eliminar paciente');
        }
      });
    }
  }

  // Redirigir a la edición
  editItem(id: number): void {
    this.router.navigate([`/${this.endpoint}/editar`, id]);
  }

  // Redirigir a la creación
  goToCreate(): void {
    this.router.navigate([`/${this.endpoint}/crear`]);
  }

  // Métodos de paginación
  calculateTotalPages(): void {
    const itemsToCount = this.searchId ? this.displayedPacientes : this.pacientes;
    this.totalPages = Math.ceil(itemsToCount.length / this.itemsPerPage) || 1;
  }

  updateDisplayedItems(): void {
    const itemsToPaginate = this.searchId ? this.displayedPacientes : this.pacientes;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPacientes = itemsToPaginate.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }
}