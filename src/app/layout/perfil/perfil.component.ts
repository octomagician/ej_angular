import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { UserPerfil } from '../../interface/UserPerfil';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { PuestoService } from '../../service/puesto/puesto.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SimpleCardComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  sexo: string = '';
  tipo_id: number | undefined = undefined;
  puesto: any[] = [];
  // otros
  errorMessage: string = '';
  datosNoGuardados: boolean = false;
  loading: boolean = false;

  constructor(
    private puestoService: PuestoService, // Servicio para obtener los puestos
    private authService: AuthService, // Servicio de autenticación
    private router: Router // Router para redireccionar
  ) {}

  ngOnInit(): void {
    this.cargarPuestos();
    this.cargarDatosUsuario();
  }

  // Cargar los puestos desde el servicio
  cargarPuestos(): void {
    this.puestoService.getPuestoService().subscribe({
      next: (data: any) => {
        // Accedemos a la propiedad correcta "tipos-personal" (con guión)
        this.puesto = data["tipos-personal"] || [];
        console.log('Puestos cargados:', this.puesto);
      },
      error: (error) => {
        console.error('Error al cargar los puestos:', error);
        this.errorMessage = 'No se pudieron cargar los puestos disponibles.';
      }
    });
  }

  cargarDatosUsuario(): void {
    this.authService.perfilData().subscribe({
        next: (response: UserPerfil) => { // Aquí aplicamos el tipo
        // Verificar si la respuesta tiene la estructura esperada
        if (response.user && response.user.persona) {
          // Datos de usuario
          this.username = response.user.username || '';
          this.email = response.user.email || '';
          this.password = ''; // No cargamos la contraseña por seguridad
          
          // Datos de persona
          this.nombre = response.user.persona.nombre || '';
          this.apellido_paterno = response.user.persona.apellido_paterno || '';
          this.apellido_materno = response.user.persona.apellido_materno || '';
          this.sexo = response.user.persona.sexo || '';
          
          // Datos de personal (tipo_id está en user en la respuesta)
          this.tipo_id = response.user.tipo_id;
  
          console.log('Datos del usuario cargados correctamente', response);
        } else {
          console.error('La respuesta no tiene la estructura esperada:', response);
          this.errorMessage = 'Error al cargar los datos del perfil.';
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario:', error);
        this.errorMessage = 'No se pudieron cargar los datos del perfil.';
      }
    });
  }

onSubmit(): void {
  // Validación básica
  if (!this.tipo_id) {
    this.errorMessage = 'Por favor selecciona un puesto';
    return;
  }

  // Crear objeto con los datos del formulario
  const userData: any = {
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido_paterno: this.apellido_paterno,
    apellido_materno: this.apellido_materno,
    sexo: this.sexo,
    tipo_id: this.tipo_id
  };

  // Solo agregar password si no está vacío
  if (this.password && this.password.trim() !== '') {
    userData['password'] = this.password;
  }

  // Mostrar carga
  this.loading = true;
  this.errorMessage = '';

  // Llamar al servicio
  this.authService.updateUser(userData).subscribe({
    next: (response: any) => {
      this.loading = false;
      this.datosNoGuardados = false;
      
      // Mostrar mensaje de éxito (usando el que viene del backend o uno genérico)
      const mensaje = response.mensaje || 'Datos actualizados correctamente';
      alert(mensaje);
      
      // Opcional: Recargar datos del usuario
      this.cargarDatosUsuario();
    },
    error: (error) => {
      this.loading = false;
      console.error('Error al actualizar:', error);
      
      // Mostrar mensaje de error del backend si existe, sino uno genérico
      this.errorMessage = error.error?.message || 
                         error.error?.error || 
                         'No se pudo actualizar, por favor intenta nuevamente.';
    }
  });
}

  // Método del Guard Exit
  check(): boolean {
    console.log('check() llamado. Comprobando si hay cambios sin guardar...');
    if (this.datosNoGuardados) {
      console.log('Hay cambios sin guardar. Mostrando confirmación...');
      const confirmacion = confirm('¿Seguro que quieres salir sin enviar los datos?');
      console.log('Confirmación del usuario:', confirmacion);
      return confirmacion;
    }
    console.log('No hay cambios sin guardar. Permitiendo salir...');
    return true;
  }

  // Se llama cada vez que el usuario interactúa con el formulario
  onInputChange() {
    const formularioVacio =
      !this.email &&
      !this.password &&
      !this.username &&
      !this.apellido_paterno &&
      !this.apellido_materno &&
      !this.nombre &&
      !this.sexo &&
      !this.tipo_id;

    if (formularioVacio) {
      console.log('Formulario vacío. Marcando datosNoGuardados como false.');
      this.datosNoGuardados = false;
    } else {
      console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
      this.datosNoGuardados = true;
    }
  }

  // Agrega este método a tu componente PerfilComponent
navigateToChangePassword() {
  this.router.navigate(['/change-password']);
}

confirmDelete() {
  // Primera confirmación
  const confirmacion = confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción es irreversible y eliminará todos tus datos permanentemente.');
  
  if (confirmacion) {
    // Segunda confirmación para mayor seguridad
    const segundaConfirmacion = confirm('ADVERTENCIA: Esta acción no se puede deshacer. ¿Realmente deseas eliminar tu cuenta?');
    
    if (segundaConfirmacion) {
      this.deleteAccount();
    }
  }
}

deleteAccount() {
  this.authService.deleteAccount().subscribe({
    next: () => {
      // Limpiar datos de sesión
      localStorage.removeItem('token');
      // Redirigir al login o página principal
      this.router.navigate(['/entrar']);
      // Opcional: Mostrar mensaje de despedida
      alert('Tu cuenta ha sido eliminada. Lamentamos que te vayas.');
    },
    error: (error) => {
      console.error('Error al eliminar cuenta:', error);
      this.errorMessage = 'Ocurrió un error al intentar eliminar tu cuenta. Por favor intenta nuevamente.';
    }
  });
}
}