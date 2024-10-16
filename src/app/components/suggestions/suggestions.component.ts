import { CommonModule } from '@angular/common';
import { LargeButton } from './../large-button/large-button.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LargeButtonComponent } from '../large-button/large-button.component';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, LargeButtonComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})

export class SuggestionsComponent {
  @Output() selectedSuggestion = new EventEmitter<string>();

  suggestions = [
    {icon: 'code', label: 'Code', onClick: ()=>{this.setSuggestion("Help me")}},
    {icon: 'summerize', label: 'Summarize text', onClick: ()=>{this.setSuggestion("Summarize")}},
    {icon: 'educate', label: 'Get Advice', onClick: ()=>{this.setSuggestion("Get advice")}},
    {icon: 'plan', label: 'Make a plan', onClick: ()=>{this.setSuggestion("Make a plan")}},
    {icon: 'write', label: 'Help me write', onClick: ()=>{this.setSuggestion("Help me write")} },
    {icon: 'plan', label: 'Brainstorm', onClick: ()=>{this.setSuggestion("Brainstorm ideas")}},
    {icon: 'suprise', label: 'Suprise Me', onClick: ()=>{this.setSuggestion("Suprise Me")}},
]

  setSuggestion(message: string) {
    this.selectedSuggestion.emit(message);
  }
}
