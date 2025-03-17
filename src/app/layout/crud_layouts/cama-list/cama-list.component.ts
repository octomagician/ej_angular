import { Component, OnInit } from '@angular/core';
import { CamaService } from '../../../service/cama/cama.service';
import { AuthService } from '../../../service/auth/auth.service';
import { Cama } from '../../../interface/cama';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../component/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cama-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './cama-list.component.html',
  styleUrls: ['./cama-list.component.css'],
})
export class CamaListComponent implements OnInit {
  camas: Cama[] = [];
  filteredCamas: Cama[] = [];
  searchId: number | null = null;
  isAdminUser: boolean = false;

  // Propiedades para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 10; // Número de elementos por página
  totalPages: number = 0;

  constructor(private camaService: CamaService, private authService: AuthService, private router: Router) {}


  // Método para redirigir a la creación de cama
  goToCreateCama(): void {
    console.log('Intentando redirigir a /camas/crear'); // Depuración
    this.router.navigate(['/camas/crear']).then((success) => {
      if (success) {
        console.log('Redirección exitosa a /camas/crear');
      } else {
        console.error('Error al redirigir a /camas/crear');
      }
    });
  }

  ngOnInit(): void {
    // Verificar si el usuario es administrador al inicializar el componente
    this.isAdminUser = this.authService.isAdmin();
    console.log('Is Admin:', this.isAdminUser);
    this.loadCamas();
  }

  // Cargar todas las camas 
  loadCamas(): void {
    this.camaService.getCamas().subscribe((data) => {
      this.camas = data;
      this.filteredCamas = data;
      console.log('Camas loaded:', this.camas);
      console.log('Filtered Camas:', this.filteredCamas);
      this.calculateTotalPages(); // Calcular el total de páginas
      this.updateDisplayedCamas(); // Actualizar las camas mostradas
    });
  }

  // Calcular el total de páginas
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredCamas.length / this.itemsPerPage);
  }

  // Actualizar las camas mostradas según la página actual
  updateDisplayedCamas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredCamas = this.camas.slice(startIndex, endIndex);
  }

  // Cambiar de página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedCamas();
    }
  }

  // Buscar cama por ID
  searchCama(): void {
    if (this.searchId) {
      this.filteredCamas = this.camas.filter((cama) => cama.id === this.searchId);
      this.currentPage = 1;
      this.calculateTotalPages();
    } else {
      this.filteredCamas = this.camas;
      this.calculateTotalPages();
      this.updateDisplayedCamas();
    }
  }

  // Eliminar cama (soft delete)
  deleteCama(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta cama?');
    if (confirmacion) {
      this.camaService.deleteCama(id).subscribe(() => {
        this.camas = this.camas.map((cama) =>
          cama.id === id ? { ...cama, deleted_at: new Date().toISOString() } : cama
        );
        this.filteredCamas = this.filteredCamas.map((cama) =>
          cama.id === id ? { ...cama, deleted_at: new Date().toISOString() } : cama
        );
        console.log('Cama eliminada correctamente');
      }, (error) => {
        console.error('Error al eliminar la cama:', error);
      });
    } else {
      console.log('Eliminación cancelada por el usuario');
    }
  }

  editCama(id: number): void {
    this.router.navigate(['/camas/editar', id]);
  }
}