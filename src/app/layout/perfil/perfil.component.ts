import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interface/user';
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
  // user
  name: string = '';
  email: string = '';
  password: string = '';
  // persona
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  sexo: string = '';
  // personal
  tipo_id: number | undefined = undefined;
  puesto: any[] = [];
  // otros
  errorMessage: string = '';
  datosNoGuardados: boolean = false;

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
      next: (data) => {
        this.puesto = data.tipo_de_personal; // Acceder a la propiedad `tipo_de_personal`
      },
      error: (error) => {
        console.error('Error al cargar los puestos:', error);
      },
      complete: () => {
        console.log('Carga de puestos completada');
      },
    });
  }

  cargarDatosUsuario(): void {
    this.authService.perfilData().subscribe({
      next: (response) => {
        // Acceder a los datos anidados
        this.name = response.user.name;
        this.email = response.user.email;
        this.password = ''; // No cargues la contraseña por seguridad
        this.nombre = response.persona.nombre;
        this.apellido_paterno = response.persona.apellido_paterno;
        this.apellido_materno = response.persona.apellido_materno;
        this.sexo = response.persona.sexo;
        this.tipo_id = response.personal.tipo_id;
  
        console.log('CargarDatosUsuario sí funcionó', response.user.name);
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario:', error);
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
      !this.name &&
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

  // Enviar el formulario
  onSubmit(): void {
    const updatedUser: Partial<User> = {
      // json - inputs
      // usuario
      name: this.name,
      email: this.email,
      password: this.password,
      // persona
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      // personal
      tipo_id: this.tipo_id,
    };

    this.authService.updateUser(updatedUser as User).subscribe({
      next: (response) => {
        this.datosNoGuardados = false;
        alert('Datos actualizados correctamente');
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se pudo actualizar, por favor intenta nuevamente.';
      },
    });
  }
}