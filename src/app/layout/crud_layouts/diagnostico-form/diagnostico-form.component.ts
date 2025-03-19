import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-diagnostico-form',
  imports: [GenericFormComponent],
  templateUrl: './diagnostico-form.component.html',
  styleUrls: ['./diagnostico-form.component.css']
})
export class DiagnosticoFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'dx', label: 'Diagnóstico', type: 'text' },
    { key: 'estatus', label: 'Estatus', type: 'select', options: ['sospechoso', 'confirmado', 'descartado'] },
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}