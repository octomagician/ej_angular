import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-estudio-form',
  imports: [GenericFormComponent],
  templateUrl: './estudio-form.component.html',
  styleUrls: ['./estudio-form.component.css']
})
export class EstudioFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'tipos_de_estudios_id', label: 'Tipo de Estudio ID', type: 'number' },
    { key: 'user_id', label: 'Usuario ID', type: 'number' },
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}