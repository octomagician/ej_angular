import { Component } from '@angular/core';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { ProfileInterface } from '../ProfileInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [UserProfileComponent, CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  profileList: ProfileInterface[] = [
    {
      id: 8888,
      name: 'Salazar',
      city: 'Torreón',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Luke_Skywalker_-_Welcome_Banner_%28Cropped%29.jpg'
    },
    {
      id: 9999,
      name: 'Burciaga',
      city: 'Torreón',
      photo: `https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/19370940/mandalorianpascal.jpeg?quality=90&strip=all&crop=18.359375%2C0%2C63.28125%2C100&w=2400`
    },
    {
      id: 7777,
      name: 'Del Toro',
      city: 'GómezYork',
      photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Han_Solo_depicted_in_promotional_image_for_Star_Wars_%281977%29.jpg/220px-Han_Solo_depicted_in_promotional_image_for_Star_Wars_%281977%29.jpg'
    }
  ];
}
