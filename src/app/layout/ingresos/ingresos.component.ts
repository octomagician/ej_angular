import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent {
  // Propiedades para manejar el estado del menú
  menuAbierto: string | null = null;
  subMenuAbierto: string | null = null;

  // Método para abrir/cerrar el menú
  toggleMenu(menu: string): void {
    this.menuAbierto = this.menuAbierto === menu ? null : menu;
  }

  // Método para abrir/cerrar el submenú
  toggleSubMenu(subMenu: string): void {
    this.subMenuAbierto = this.subMenuAbierto === subMenu ? null : subMenu;
  }
}