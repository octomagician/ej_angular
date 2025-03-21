import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-tipos-de-estudio-form',
  imports: [GenericFormComponent],
  templateUrl: './tipos-de-estudio-form.component.html',
  styleUrls: ['./tipos-de-estudio-form.component.css']
})
export class TiposDeEstudioFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}