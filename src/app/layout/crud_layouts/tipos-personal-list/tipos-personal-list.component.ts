import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../component/generic-list/generic-list.component';

@Component({
    selector: 'app-tipos-personal-list',
    imports: [GenericListComponent],
    templateUrl: './tipos-personal-list.component.html',
    styleUrls: ['./tipos-personal-list.component.css'],
})
export class TiposPersonalListComponent implements OnInit {
    isAdminUser: boolean = false;

    columns = [
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
    ];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.isAdminUser = this.authService.isAdmin();
    }
}