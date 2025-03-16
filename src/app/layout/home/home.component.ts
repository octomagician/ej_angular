import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../component/pagination/pagination.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Datos de las secciones del hospital
  sections = [
    { floor: 'Sótano', items: ['Facturación', 'Almacenamiento'] },
    { floor: 'Piso 1', items: ['Cajero', 'Salud Comunitaria y Educación', 'MCCR', 'Enfermedades Digestivas', 'Laboratorio', 'Servicios Médicos Ejecutivos', 'Medicina Nuclear', 'Farmacia', 'Medicina Física', 'Radiología', 'Registro', 'Atención Urgente', 'Viajes'] },
    { floor: 'Piso 2', items: ['Centro de Conferencias', 'Investigación Clínica', 'Programa de Cuidados Paliativos', 'Ética en la Atención Médica', 'Redes para la Investigación', 'Solución de Bienestar'] },
    { floor: 'Piso 3', items: ['Biomedicina', 'Clínica de Ojos', 'Clínicas Médicas', 'Clínicas de Neurología', 'Neurociencias', 'Instituto Neurológico', 'Cirugía Ambulatoria', 'Centro del Dolor', 'Centro Cardíaco Preventivo', 'Clínicas Quirúrgicas', 'Cirugía para Pérdida de Peso', 'Dispensario de Ropa Quirúrgica'] },
    { floor: 'Piso 4', items: ['Clínicas de Maternidad', 'Instituto de Genética Médica', 'Instituto de Urología Mínimamente Invasiva', 'Unidad de Cuidados Intensivos Neonatales', 'Servicios Obstétricos y Ginecológicos', 'Servicios Pediátricos', 'Servicios Quirúrgicos Pediátricos', 'Salud Pélvica', 'Centro de Diagnóstico Prenatal', 'Servicios de Farmacia'] },
    { floor: 'Piso 5', items: ['Centro Oncológico', 'Centro de Detección de Cáncer', 'Enfermedades Digestivas', 'Centro de Imágenes', 'Servicios de Laboratorio', 'Programa de Trasplantes', 'Psiquiatría'] }
  ];

  // Variables de paginación
  currentPage: number = 1; // Página actual
  perPage: number = 1;    // Secciones por página (1 piso por página)
  totalPages: number = this.sections.length; // Total de páginas

  // Getter para obtener las secciones visibles en la página actual
  get visibleSections(): string[] {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    return this.sections.slice(startIndex, endIndex)[0]?.items || [];
  }

  // Getter para obtener el nombre del piso actual
  get currentFloor(): string {
    return this.sections[this.currentPage - 1]?.floor || '';
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page;
  }
}