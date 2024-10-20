import { HeaderComponent } from './layouts/header/header.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
