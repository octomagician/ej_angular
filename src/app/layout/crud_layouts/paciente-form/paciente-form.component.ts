import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../service/generic/generic-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  pacienteForm: FormGroup;
  isEditMode = false;
  itemId: number | null = null;
  errorMessage: string | null = null;
  datosNoGuardados = false;
  endpoint = 'pacientes';

  constructor(
    private fb: FormBuilder,
    private genericService: GenericService<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: [''],
      sexo: ['', Validators.required],
      nacimiento: ['', Validators.required],
      nss: ['', Validators.required],
      direccion: ['', Validators.required],
      tel_1: ['', Validators.required],
      tel_2: ['']
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.isEditMode = true;
      this.loadItem(this.itemId);
    }
  }

  loadItem(id: number): void {
    this.genericService.getById(this.endpoint, id).subscribe(
      (response: any) => {
        const pacienteData = response.paciente;
        const personaData = pacienteData.persona;
        
        const formData = {
          ...pacienteData,
          nombre: personaData.nombre,
          apellido_paterno: personaData.apellido_paterno,
          apellido_materno: personaData.apellido_materno,
          sexo: personaData.sexo
        };

        this.pacienteForm.patchValue(formData);
      },
      (error) => {
        console.error('Error al cargar el paciente:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;
      
      // Estructura directa como funciona en Insomnia
      const pacienteData = {
        nombre: formData.nombre,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno,
        sexo: formData.sexo,
        nacimiento: formData.nacimiento,
        nss: formData.nss,
        direccion: formData.direccion,
        tel_1: formData.tel_1,
        tel_2: formData.tel_2 || null // Asegurar null en vez de string vacío si es necesario
      };
  
      // Debug detallado
      console.log('[DEBUG] Datos a enviar:', JSON.stringify(pacienteData, null, 2));
      console.log('[DEBUG] Endpoint:', this.endpoint);
      console.log('[DEBUG] Modo:', this.isEditMode ? 'Edición' : 'Creación');
      console.log('[DEBUG] ID:', this.itemId);
  
      if (this.isEditMode && this.itemId) {
        console.log(`[DEBUG] Enviando PUT a ${this.endpoint}/${this.itemId}`);
        
        this.genericService.update(this.endpoint, this.itemId, pacienteData).subscribe({
          next: (response) => {
            console.log('[DEBUG] Actualización exitosa:', response);
            this.pacienteForm.markAsPristine();
            this.router.navigate([`/${this.endpoint}`]);
          },
          error: (error) => {
            console.error('[DEBUG] Error en actualización:', {
              status: error.status,
              message: error.message,
              error: error.error,
              url: error.url
            });
            this.errorMessage = error.error?.message || 'Error al actualizar el paciente';
          }
        });
      } else {
        console.log('[DEBUG] Enviando POST a ${this.endpoint}');
        
        this.genericService.create(this.endpoint, pacienteData).subscribe({
          next: (response) => {
            console.log('[DEBUG] Creación exitosa:', response);
            this.pacienteForm.markAsPristine();
            this.router.navigate([`/${this.endpoint}`]);
          },
          error: (error) => {
            console.error('[DEBUG] Error en creación:', {
              status: error.status,
              message: error.message,
              error: error.error,
              url: error.url
            });
            this.errorMessage = error.error?.message || 'Error al crear el paciente';
          }
        });
      }
    } else {
      console.error('[DEBUG] Formulario inválido. Errores:', this.getFormErrors());
    }
  }
  
  // Método auxiliar para obtener errores detallados
  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.pacienteForm.controls).forEach(key => {
      const control = this.pacienteForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  onInputChange(): void {
    this.datosNoGuardados = this.pacienteForm.dirty;
    console.log('Formulario modificado:', this.datosNoGuardados);
  }
    check(): boolean {
      if (this.pacienteForm.dirty) {
        const confirmacion = confirm('¿Seguro que quieres salir sin guardar los cambios?');
        return confirmacion;
      }
      return true;
    }
  }