import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-ingreso-form',
  imports: [GenericFormComponent],
  templateUrl: './ingreso-form.component.html',
  styleUrls: ['./ingreso-form.component.css']
})
export class IngresoFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  
  fields = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'pacientes_id', label: 'Paciente', type: 'select' },
    { key: 'diagnostico_id', label: 'Diagnóstico', type: 'select' },
    { key: 'camas_id', label: 'Cama', type: 'select' },
    { key: 'user_id', label: 'Personal', type: 'select' },
    { key: 'fecha_ingreso', label: 'Fecha de Ingreso', type: 'date' },
    { key: 'motivo_ingreso', label: 'Motivo de Ingreso', type: 'text' }
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}