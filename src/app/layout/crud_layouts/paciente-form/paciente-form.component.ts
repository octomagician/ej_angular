import { Component, ViewChild } from '@angular/core';
import { DualTableFormComponent } from '../../../component/dual-table-form/dual-table-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-paciente-form',
  imports: [DualTableFormComponent],
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
})
export class PacienteFormComponent implements Check {
  @ViewChild(DualTableFormComponent) dualTableFormComponent!: DualTableFormComponent<any, any>;
  fieldsTable1 = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'apellido_paterno', label: 'Apellido Paterno', type: 'text' },
    { key: 'apellido_materno', label: 'Apellido Materno', type: 'text' },
    { key: 'sexo', label: 'Sexo', type: 'select', options: ['Masculino', 'Femenino', 'Otro'] },
  ];
  fieldsTable2 = [
    { key: 'nacimiento', label: 'Fecha de Nacimiento', type: 'date' },
    { key: 'nss', label: 'NSS', type: 'text' },
    { key: 'direccion', label: 'Dirección', type: 'text' },
    { key: 'tel_1', label: 'Teléfono 1', type: 'text' },
    { key: 'tel_2', label: 'Teléfono 2', type: 'text' },
  ];

  check(): boolean {
    return this.dualTableFormComponent.check();
  }
}