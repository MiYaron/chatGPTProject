import { Component, ViewChild } from '@angular/core';
import { MessageBarComponent } from '../../components/message-bar/message-bar.component';
import { SuggestionsComponent } from '../../components/suggestions/suggestions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageBarComponent,SuggestionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(MessageBarComponent) messageBarComponent!: MessageBarComponent;

  onSuggestionSelected(suggestion: string) {
    this.messageBarComponent.setInputMessage(suggestion);
  }
}
