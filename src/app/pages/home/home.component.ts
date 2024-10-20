import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class HomeComponent{
  @ViewChild(MessageBarComponent) messageBarComponent!: MessageBarComponent;
  @ViewChild('markerDot') markerDot!: ElementRef<HTMLDivElement>;

  onSuggestionSelected(suggestion: string) {
    this.messageBarComponent.setInputMessage(suggestion);
  }

  showMarker(isTyping: boolean) {
    if (this.markerDot) {
      isTyping? this.markerDot.nativeElement.style.display = "block" :
      this.markerDot.nativeElement.style.display = "none";
    }
  }
}
