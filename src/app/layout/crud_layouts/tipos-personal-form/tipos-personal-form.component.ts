import { Component, ViewChild } from '@angular/core';
import { GenericFormComponent } from '../../../component/generic-form/generic-form.component';
import { Check } from '../../../interface/check';

@Component({
    selector: 'app-tipos-personal-form',
    imports: [GenericFormComponent],
    templateUrl: './tipos-personal-form.component.html',
    styleUrls: ['./tipos-personal-form.component.css']
})
export class TiposPersonalFormComponent implements Check {
    @ViewChild(GenericFormComponent) genericFormComponent!: GenericFormComponent<any>;
    fields = [
        { key: 'nombre', label: 'Nombre del Tipo de Personal', type: 'text' },
    ];

    check(): boolean {
        return this.genericFormComponent.check();
    }
}