import { Component } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { ChatComponent } from '../../services/chat/chat.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent,ChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
