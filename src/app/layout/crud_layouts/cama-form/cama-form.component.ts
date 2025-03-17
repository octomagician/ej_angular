// cama-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaService } from '../../../service/cama/cama.service';
import { Cama } from '../../../interface/cama';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cama-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent implements OnInit {
  camaForm: FormGroup;
  isEditMode = false;
  camaId: number | null = null;
  errorMessage: string | null = null; // Variable para almacenar el mensaje de error

  constructor(
    private fb: FormBuilder,
    private camaService: CamaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.camaForm = this.fb.group({
      numero_cama: ['', Validators.required],
      area_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.camaId = this.route.snapshot.params['id'];
    if (this.camaId) {
      this.isEditMode = true;
      this.loadCama(this.camaId);
    }
  }

  loadCama(id: number): void {
    this.camaService.getCamaById(id).subscribe(
      (response) => {
        const cama = response.cama;
        this.camaForm.patchValue(cama);
      },
      (error) => {
        console.error('Error al cargar la cama:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.camaForm.valid) {
      const camaData = this.camaForm.value;

      if (this.isEditMode && this.camaId) {
        this.camaService.updateCama(this.camaId, camaData).subscribe(
          () => {
            console.log('Cama actualizada correctamente.');
            this.router.navigate(['/camas']); // Redirige solo si no hay error
          },
          (error) => {
            console.error('Error al actualizar la cama:', error);
            this.errorMessage = error.error.message || 'Error al actualizar la cama'; // Muestra el error
          }
        );
      } else {
        this.camaService.createCama(camaData).subscribe(
          () => {
            console.log('Cama creada correctamente.');
            this.router.navigate(['/camas']); // Redirige solo si no hay error
          },
          (error) => {
            console.error('Error al crear la cama:', error);
            this.errorMessage = error.error.message || 'Error al crear la cama'; // Muestra el error
          }
        );
      }
    } else {
      console.log('Formulario no válido. Revise los campos.');
    }
  }
}