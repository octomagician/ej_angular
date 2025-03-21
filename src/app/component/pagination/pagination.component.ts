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

  // Número de páginas visibles alrededor de la página actual
  private readonly visiblePages = 5;

  // Getter para generar un arreglo de números de páginas visibles
  get visiblePageNumbers(): number[] {
    const start = Math.max(1, this.currentPage - Math.floor(this.visiblePages / 2));
    const end = Math.min(this.totalPages, start + this.visiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Método para cambiar de página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page); // Emitir el cambio de página
    }
  }

  // Método para avanzar o retroceder en bloques de páginas
  navigateBlock(direction: 'prev' | 'next'): void {
    const blockSize = this.visiblePages;
    let newPage = this.currentPage;

    if (direction === 'prev') {
      newPage = Math.max(1, this.currentPage - blockSize);
    } else if (direction === 'next') {
      newPage = Math.min(this.totalPages, this.currentPage + blockSize);
    }

    this.changePage(newPage);
  }
}