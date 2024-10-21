import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css'
})
export class MenuButtonComponent {
  @Input() width?: string;
}
