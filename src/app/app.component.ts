import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserProfileComponent, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ej_Angular';
}
