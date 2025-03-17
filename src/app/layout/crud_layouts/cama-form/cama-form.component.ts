import { Component } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';

@Component({
  selector: 'app-cama-form',
  imports: [GenericFormComponent],
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent {
  fields = [
    { key: 'numero_cama', label: 'Número de Cama', type: 'number' },
    { key: 'area_id', label: 'Área ID', type: 'number' },
  ];
}