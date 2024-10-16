import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface LargeButton {
  icon?: string;
  label: string;
  onClick: ()=>void;
}

@Component({
  selector: 'app-large-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './large-button.component.html',
  styleUrl: './large-button.component.css'
})
export class LargeButtonComponent {
  @Input() icon?: string;
  @Input() label!: string;
  @Input() onClick!: ()=> void;
}
