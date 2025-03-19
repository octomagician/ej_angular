import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../service/generic/generic-service.service';
import { BaseItem } from '../../interface/base-item';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Check } from '../../interface/check';

@Component({
  selector: 'app-generic-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent<T extends BaseItem> implements OnInit, Check{
  @Input() endpoint: string = ''; // Nombre del endpoint (ej: 'camas', 'diagnosticos')
  @Input() fields: { key: string; label: string; type: string }[] = []; // Campos del formulario
  @Input() formTitle: string = ''; // Título del formulario (ej: 'Crear Cama', 'Editar Diagnóstico')

  genericForm: FormGroup;
  isEditMode = false;
  itemId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private genericService: GenericService<T>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.genericForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Inicializar el formulario con los campos dinámicos
    this.fields.forEach((field) => {
      if (field.key === 'observaciones') {
        // Si el campo es 'observaciones', no aplicar Validators.required
        this.genericForm.addControl(field.key, this.fb.control(''));
      } else {
        this.genericForm.addControl(field.key, this.fb.control('', Validators.required));
      }
    });
  
    // Verificar si estamos en modo edición
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.isEditMode = true;
      this.loadItem(this.itemId);
    }
  }

  private endpointExceptions: { [key: string]: string } = {
    historial: 'historial', // La clave en la respuesta JSON es "historial"
    /*diagnosticos: 'diagnostico'*/
  };

  private getSingularEndpoint(endpoint: string): string {
    // Verifica si el endpoint tiene una excepción definida, sino, le quita la S
    if (this.endpointExceptions[endpoint]) {
      return this.endpointExceptions[endpoint];
    }
  
    // Si no hay excepción, elimina la última letra (asume que el plural termina con "s")
    return endpoint.slice(0, -1);
  }

  // Cargar un item por ID
loadItem(id: number): void {
  this.genericService.getById(this.endpoint, id).subscribe(
    (response: any) => {
      console.log('Datos cargados:', response); // Verifica los datos cargados

      // Obtén el nombre de la propiedad en singular
      const singularEndpoint = this.getSingularEndpoint(this.endpoint);

      // Extrae los datos de la propiedad en singular
      const itemData = response[singularEndpoint] || response;
      this.genericForm.patchValue(itemData); // Pre-llenar el formulario con los datos extraídos
    },
    (error) => {
      console.error('Error al cargar el item:', error);
    }
  );
}

  // Enviar el formulario
  onSubmit(): void {
    if (this.genericForm.valid) {
      const formData = this.genericForm.value;
  
      if (this.isEditMode && this.itemId) {
        // Modo edición
        this.genericService.update(this.endpoint, this.itemId, formData).subscribe(
          () => {
            console.log('Item actualizado correctamente.');
            this.genericForm.markAsPristine(); // Marcar el formulario como no modificado
            this.router.navigate([`/${this.endpoint}`]);
          },
          (error) => {
            console.error('Error al actualizar el item:', error);
            this.errorMessage = error.error.message || 'Error al actualizar el item';
          }
        );
      } else {
        // Modo creación
        this.genericService.create(this.endpoint, formData).subscribe(
          () => {
            console.log('Item creado correctamente.');
            this.genericForm.markAsPristine(); // Marcar el formulario como no modificado
            this.router.navigate([`/${this.endpoint}`]);
          },
          (error) => {
            console.error('Error al crear el item:', error);
            this.errorMessage = error.error.message || 'Error al crear el item';
          }
        );
      }
    } else {
      console.log('Formulario no válido. Revise los campos.');
    }
  }

  // Método del Guard Exit ------------------------------------------------------
  datosNoGuardados: boolean = false;

  check(): boolean {
    if (this.genericForm.dirty) {
      const confirmacion = confirm('¿Seguro que quieres salir sin guardar los cambios?');
      return confirmacion;
    }
    return true;
  }

  // Se llama cada vez que el usuario interactúa con el formulario
onInputChange() {
  this.datosNoGuardados = this.genericForm.dirty;
  console.log('Formulario modificado:', this.datosNoGuardados);
}
}