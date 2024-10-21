import { HeaderComponent } from './layouts/header/header.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { SidemenuComponent } from './layouts/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, MainComponent, SidemenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidemenuVisible = false;

  toggleSidemenu() {
    this.isSidemenuVisible = !this.isSidemenuVisible;
  }
}
