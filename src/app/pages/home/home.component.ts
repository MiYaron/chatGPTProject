import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageBarComponent } from '../../components/message-bar/message-bar.component';
import { SuggestionsComponent } from '../../components/suggestions/suggestions.component';
import { TypewriterComponent } from '../../components/typewriter/typewriter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageBarComponent,SuggestionsComponent, TypewriterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @ViewChild(MessageBarComponent) messageBarComponent!: MessageBarComponent;

  onSuggestionSelected(suggestion: string) {
    this.messageBarComponent.setInputMessage(suggestion);
  }

  ngOnInit() {
    setTimeout(() => {
      const markerDot: HTMLDivElement | null = document.querySelector(".marker-dot");
      if (markerDot) {
        markerDot.style.display = "none";
      }
    }, 600);
  }
}
