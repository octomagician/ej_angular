import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../service/generic/generic-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode = false;
  itemId: number | null = null;
  errorMessage: string | null = null;
  datosNoGuardados = false;
  endpoint = 'users';

  constructor(
    private fb: FormBuilder,
    private genericService: GenericService<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: [''],
      sexo: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_id: ['', Validators.required],
      password: ['', Validators.required] 
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
        const userData = response.user;
        const persona = userData.persona;

        const formData = {
          nombre: persona.nombre,
          apellido_paterno: persona.apellido_paterno,
          apellido_materno: persona.apellido_materno,
          sexo: persona.sexo,
          username: userData.username,
          email: userData.email,
          tipo_id: userData.tipo_id,
        };

        this.usuarioForm.patchValue(formData);
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
        this.errorMessage = 'Error al cargar los datos del usuario';
      }
    );
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const formData = this.usuarioForm.value;
  
      const payload: any = {
        nombre: formData.nombre,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno,
        sexo: formData.sexo,
        username: formData.username,
        email: formData.email,
        tipo_id: formData.tipo_id,
        password: formData.password  // Siempre se envía
      };
  
      if (this.isEditMode && this.itemId) {
        this.genericService.update(this.endpoint, this.itemId, payload).subscribe({
          next: () => {
            this.usuarioForm.markAsPristine();
            this.router.navigate([`/${this.endpoint}`]);
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            console.error('Errores de validación:', error.error?.errores);
            this.errorMessage = error.error?.mensaje || 'Error al actualizar el usuario';
          }
        });
      } else {
        this.genericService.create(this.endpoint, payload).subscribe({
          next: () => {
            this.usuarioForm.markAsPristine();
            this.router.navigate([`/${this.endpoint}`]);
          },
          error: (error) => {
            console.error('Error al crear:', error);
            console.error('Errores de validación:', error.error?.errores);
            this.errorMessage = error.error?.mensaje || 'Error al crear el usuario';
          }
        });
      }
    } else {
      console.warn('Formulario inválido:');
    }
  }
  

  onInputChange(): void {
    this.datosNoGuardados = this.usuarioForm.dirty;
  }

  check(): boolean {
    if (this.usuarioForm.dirty) {
      return confirm('¿Seguro que quieres salir sin guardar los cambios?');
    }
    return true;
  }
}
