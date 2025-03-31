import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { GenericService } from '../../../service/generic/generic-service.service';
import { PaginationComponent } from '../../../component/pagination/pagination.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  displayedUsers: any[] = [];

  searchId: number | null = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  isAdminUser = false;
  private readonly endpoint = 'users';

  constructor(
    private authService: AuthService,
    private genericService: GenericService<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.loadUsers();
  }

  ngOnDestroy(): void {
  }

  loadUsers(): void {
    this.authService.getAll(this.endpoint).subscribe({
      next: (response: any) => {
        if (Array.isArray(response.users)) {
          this.users = response.users;
          this.calculateTotalPages();
          this.updateDisplayedItems();
        } else {
          console.error('La respuesta no contiene la lista de usuarios:', response);
          this.users = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }
  
  searchItem(): void {
    if (this.searchId) {
      this.displayedUsers = this.users.filter(user => user.id === Number(this.searchId));
      this.currentPage = 1;
      this.calculateTotalPages();
    } else {
      this.displayedUsers = [...this.users];
      this.updateDisplayedItems();
    }
  }

  deleteItem(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmacion) {
      this.genericService.delete(this.endpoint, id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.updateDisplayedItems();
          alert('Usuario eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          alert('Error al eliminar usuario');
        }
      });
    }
  }

  editItem(id: number): void {
    this.router.navigate([`/${this.endpoint}/editar`, id]);
  }

  goToCreate(): void {
    this.router.navigate([`/${this.endpoint}/crear`]);
  }

  calculateTotalPages(): void {
    const itemsToCount = this.searchId ? this.displayedUsers : this.users;
    this.totalPages = Math.ceil(itemsToCount.length / this.itemsPerPage) || 1;
  }

  updateDisplayedItems(): void {
    const itemsToPaginate = this.searchId ? this.displayedUsers : this.users;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedUsers = itemsToPaginate.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }
}
