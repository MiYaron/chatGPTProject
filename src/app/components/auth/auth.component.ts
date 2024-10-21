import { Component } from '@angular/core';
import { SmallButtonComponent } from '../small-button/small-button.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SmallButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
