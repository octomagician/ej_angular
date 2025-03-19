import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-historial-form',
  imports: [GenericFormComponent],
  templateUrl: './historial-form.component.html',
  styleUrls: ['./historial-form.component.css']
})
export class HistorialFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'ingreso_id', label: 'ID de Ingreso', type: 'number' },
    { key: 'user_id', label: 'ID de Usuario', type: 'number' },
    { key: 'presion', label: 'Presión', type: 'text' },
    { key: 'temperatura', label: 'Temperatura', type: 'number' },
    { key: 'glucosa', label: 'Glucosa', type: 'number' },
    { key: 'sintomatologia', label: 'Sintomatología', type: 'text' },
    { key: 'observaciones', label: 'Observaciones', type: 'text' },
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}