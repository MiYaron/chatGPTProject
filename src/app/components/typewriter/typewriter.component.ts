import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent implements OnInit{
  @Input() text!: string;
  speed = 20;
  animatedText = '';

  ngOnInit() {
    this.animate(0);
  }

  private animate(i: number) {
    if (i < this.text.length) {
      this.animatedText += this.text.charAt(i);
      setTimeout(() => this.animate(++i), this.speed);
    }
  }
}
