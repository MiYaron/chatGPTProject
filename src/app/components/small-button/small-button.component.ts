import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-button.component.html',
  styleUrl: './small-button.component.css'
})
export class SmallButtonComponent {
  @Input() style = '';  
}
