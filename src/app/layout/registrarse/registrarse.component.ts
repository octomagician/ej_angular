import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interface/user';
import { SimpleCardComponent } from '../../component/simple-card/simple-card.component';
import { PuestoService } from '../../service/puesto/puesto.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SimpleCardComponent],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent implements OnInit {
  // user
  username: string = '';
  email: string = '';
  password: string = '';
  // persona
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  sexo: string = '';
  // user
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

  // Enviar el formulario
  onSubmit(): void {
    const newUser: Partial<User> = {
      // json - inputs
      // usuario
      username: this.username,
      email: this.email,
      password: this.password,
      // persona
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      // user
      tipo_id: this.tipo_id ?? 5, // Usa de defecto recepcionista si es undefined
    };

    this.authService.registerUser(newUser as User).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // Imprime la respuesta
        this.datosNoGuardados = false;
        
        // Redirigir a la página de inicio de sesión con un parámetro
        this.router.navigate(['/entrar'], {
        queryParams: { registroExitoso: 'true' }, // Enviar parámetro
        });

      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se pudo registrar, por favor intenta nuevamente.';
      },
    });
  }
}