import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent implements OnInit{
  @Input() text!: string;
  @Input() typeSpeed = 0;
  @Output() isTyping = new EventEmitter<boolean>()
  animatedText = '';

  ngOnInit() {
    this.isTyping.next(true);
    this.animate(0);
  }

  private animate(i: number) {
    if (i < this.text?.length) {
      this.animatedText += this.text.charAt(i);
      setTimeout(() => this.animate(++i), this.typeSpeed);
    } else {
      this.isTyping.next(false);
    }
  }
}
