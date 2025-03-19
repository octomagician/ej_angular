import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-cama-form',
  imports: [GenericFormComponent],
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'numero_cama', label: 'Número de Cama', type: 'number' },
    { key: 'area_id', label: 'Área ID', type: 'number' },
  ];

  check(): boolean {
    return this.genericFormComponent.check();}
}