import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
  selector: 'app-area-form',
  imports: [GenericFormComponent],
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements Check {
  @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
  fields = [
    { key: 'nombre', label: 'Nombre del Área', type: 'text' },
  ];

  check(): boolean {
    return this.genericFormComponent.check();
  }
}