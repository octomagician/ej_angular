import { Component, Input } from '@angular/core';
import { ProfileInterface } from '../ProfileInterface';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  mensaje = 'Perfil de usuario';
  @Input() profile!: ProfileInterface;
  
  /* EJEMPLO INTERFAZ COMO DEBE SER 
  @Input() profile!: ProfileInterface;
  */

  /* EJEMPLO INTERFAZ SENCILLA
  instanciaProfile: ProfileInterface = {
    id: 9999,
    name: 'Burciaga',
    city: 'Torreón',
    photo: `https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/19370940/mandalorianpascal.jpeg?quality=90&strip=all&crop=18.359375%2C0%2C63.28125%2C100&w=2400`
  };
  */
}
