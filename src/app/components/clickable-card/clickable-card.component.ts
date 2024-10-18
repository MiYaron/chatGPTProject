import { Component, Input } from '@angular/core';

export interface ClickableCard {
  label: string;
  text: string;
  onClick: ()=>void;
}

@Component({
  selector: 'app-clickable-card',
  standalone: true,
  imports: [],
  templateUrl: './clickable-card.component.html',
  styleUrl: './clickable-card.component.css'
})
export class ClickableCardComponent {
  @Input() label!: string;
  @Input() text!: string;
  @Input() onClick!: ()=> void;
}
