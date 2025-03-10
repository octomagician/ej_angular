import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth/auth.service';
import { SimpleCardComponent } from '../../../component/simple-card/simple-card.component';

@Component({
  selector: 'app-modificar-existente',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleCardComponent],
  templateUrl: './modificar-existente.component.html',
  styleUrls: ['./modificar-existente.component.css'],
})
export class ModificarExistenteComponent {
  // Campo para buscar al paciente
  nssBusqueda: string = '';

  // Campos del formulario
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  sexo: string = '';
  nacimiento: string = '';
  nss: string = '';
  direccion: string = '';
  tel_1: string = '';
  tel_2: string = '';

  // Mensajes
  errorMessage: string = '';
  successMessage: string = '';

  // Estado del formulario
  datosNoGuardados: boolean = false;

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
        !this.name &&
        !this.email &&
        !this.password &&
        !this.nombre &&
        !this.apellido_paterno &&
        !this.apellido_materno &&
        !this.sexo &&
        !this.nacimiento &&
        !this.nss &&
        !this.direccion &&
        !this.tel_1 &&
        !this.tel_2;
  
      if (formularioVacio) {
        console.log('Formulario vacío. Marcando datosNoGuardados como false.');
        this.datosNoGuardados = false;
      } else {
        console.log('Se detectaron cambios en el formulario. Marcando datosNoGuardados como true.');
        this.datosNoGuardados = true;
      }
    }

  constructor(private authService: AuthService) {}

  // Método para buscar al paciente por NSS
  buscarPaciente(): void {
    if (!this.nssBusqueda) {
      this.errorMessage = 'Por favor, ingresa un NSS válido.';
      return;
    }

    this.authService.getPacienteByNss(this.nssBusqueda).subscribe({
      next: (response) => {
        this.cargarDatosPaciente(response); // Cargar los datos del paciente en el formulario
        this.errorMessage = '';
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se encontró un paciente con ese NSS.';
        this.limpiarFormulario();
      },
    });
  }


// Método para cargar los datos del paciente en el formulario
cargarDatosPaciente(response: any): void {
  const paciente = response.paciente;
  const persona = response.persona;
  const user = response.user;

  // Cargar datos del usuario
  this.name = user.name;
  this.email = user.email;

  // Cargar datos de la persona
  this.nombre = persona.nombre;
  this.apellido_paterno = persona.apellido_paterno;
  this.apellido_materno = persona.apellido_materno;
  this.sexo = persona.sexo;
  this.nacimiento = paciente.nacimiento; // Nota: "nacimiento" está en "paciente", no en "persona"

  // Cargar datos del paciente
  this.nss = paciente.nss;
  this.direccion = paciente.direccion;
  this.tel_1 = paciente.tel_1;
  this.tel_2 = paciente.tel_2;
}

  // Método para enviar el formulario
  onSubmit(): void {
    const updatedPaciente = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      nacimiento: this.nacimiento,
      nss: this.nss,
      direccion: this.direccion,
      tel_1: this.tel_1,
      tel_2: this.tel_2,
    };

    this.authService.updatePaciente(this.nssBusqueda, updatedPaciente).subscribe({
      next: (response) => {
        this.successMessage = 'Paciente actualizado con éxito.';
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'No se pudo actualizar al paciente. Inténtalo de nuevo.';
      },
    });
  }

  // Método para limpiar el formulario
  limpiarFormulario(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.password_confirmation = '';
    this.nombre = '';
    this.apellido_paterno = '';
    this.apellido_materno = '';
    this.sexo = '';
    this.nacimiento = '';
    this.nss = '';
    this.direccion = '';
    this.tel_1 = '';
    this.tel_2 = '';
    this.datosNoGuardados = false;
  }
}