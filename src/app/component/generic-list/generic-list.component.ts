import { Component, Input, OnInit } from '@angular/core';
import { GenericService } from '../../service/generic/generic-service.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseItem } from '../../interface/base-item';

@Component({
  selector: 'app-generic-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css'],
})
export class GenericListComponent<T extends BaseItem> implements OnInit {
  @Input() endpoint: string = ''; // Nombre del endpoint (ej: 'camas', 'diagnosticos')
  @Input() columns: { key: string; label: string }[] = []; // Columnas a mostrar
  @Input() isAdminUser: boolean = false; // Verificación de rol

  items: T[] = [];
  filteredItems: T[] = [];
  searchId: number | null = null;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private genericService: GenericService<T>, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // Cargar todos los registros
  loadItems(): void {
    this.genericService.getAll(this.endpoint).subscribe((data) => {
      console.log(this.endpoint)
      this.items = data;
      this.filteredItems = data;
      this.calculateTotalPages();
      this.updateDisplayedItems();
    });
    console.log(this.items);
    console.log(this.filteredItems);
  }

  // Buscar por ID
  searchItem(): void {
    if (this.searchId) {
      this.filteredItems = this.items.filter((item: any) => item.id === this.searchId);
      this.currentPage = 1;
      this.calculateTotalPages();
    } else {
      this.filteredItems = this.items;
      this.calculateTotalPages();
      this.updateDisplayedItems();
    }
  }

  // Eliminar un registro
  deleteItem(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmacion) {
      this.genericService.delete(this.endpoint, id).subscribe(() => {
        this.items = this.items.filter((item: any) => item.id !== id);
        this.filteredItems = this.filteredItems.filter((item: any) => item.id !== id);
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
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    console.log(this.totalPages);
    console.log(this.filteredItems.length);
    console.log(this.itemsPerPage);
  }

  updateDisplayedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredItems = this.items.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }
}