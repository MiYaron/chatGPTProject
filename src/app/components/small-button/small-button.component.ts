import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-button',
  standalone: true,
  imports: [],
  templateUrl: './small-button.component.html',
  styleUrl: './small-button.component.css'
})
export class SmallButtonComponent {
  @Input() backgroundColor = '';
  @Input() color = '';
  
}
