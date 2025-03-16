// pagination.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1; // Página actual
  @Input() totalPages: number = 0;  // Total de páginas
  @Output() pageChange = new EventEmitter<number>(); // Evento para notificar cambios de página

  // Getter para generar un arreglo de números de páginas
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Método para cambiar de página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page); // Emitir el cambio de página
    }
  }
}