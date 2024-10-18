import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LargeButtonComponent, LargeButton } from '../large-button/large-button.component';
import { ClickableCardComponent, ClickableCard } from '../clickable-card/clickable-card.component';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, LargeButtonComponent, ClickableCardComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})

export class SuggestionsComponent implements OnInit{
  @Output() selectedSuggestion = new EventEmitter<string>();
  private isShowingAll = false;

  constructor(private messagingService: MessagingService) {}

  suggestions: LargeButton[] = [
    {icon: 'code', label: 'Code', onClick: ()=>{this.inputSuggestion("Help me")}},
    {icon: 'summerize', label: 'Summarize text', onClick: ()=>{this.inputSuggestion("Summarize")}},
    {icon: 'educate', label: 'Get Advice', onClick: ()=>{this.inputSuggestion("Get advice")}},
    {icon: 'plan', label: 'Make a plan', onClick: ()=>{this.inputSuggestion("Make a plan")}},
    {icon: 'write', label: 'Help me write', onClick: ()=>{this.inputSuggestion("Help me write")} },
    {icon: 'plan', label: 'Brainstorm', onClick: ()=>{this.inputSuggestion("Brainstorm ideas")}},
    {icon: 'suprise', label: 'Suprise Me', onClick: ()=>{this.inputSuggestion("Suprise Me")}},
  ]

  tasks: ClickableCard[] = [
    {label: 'Make up a story', text: 'about Sharky a tooth-brushing superhero', onClick: ()=>{this.messagingService.sendMessage('Make up a 5-sentence story about "Sharky", a tooth-brushing shark superhero. Make each sentence a bullet point.')}},
    {label: 'Test my knowledge', text: 'on ancient civillizations', onClick: ()=>{this.messagingService.sendMessage("Can you test my knowledge on ancient civilizations by asking me specific questions? Start by asking me which civilization I'm most interested in and why.")}},
    {label: 'Write a Python script', text: 'to automate sending daily email reports', onClick: ()=>{this.messagingService.sendMessage('Write a script to automate sending daily email reports in Python, and walk me through how I would set it up.')}},
    {label: 'Suggest fun activities', text: 'to help me make friends in a new city', onClick: ()=>{this.messagingService.sendMessage("I just moved to a new city and I'm looking to make friends. Can you suggest some fun activities that will help me do that?")}},
    {label: 'Design a programming game', text: 'teach basics in a fun way', onClick: ()=>{this.messagingService.sendMessage("Can you help me design a game concept that teaches basic programming skills? Start by asking me which programming language I'd like to focus on.")}},
    {label: 'Quiz me on world capitals', text: 'to enhance my geography skills', onClick: ()=>{this.messagingService.sendMessage("Let's start improving my geography skills by quizzing me on world capitals. You can start by asking me the capital of a country of your choice, and I'll do my best to answer correctly.")}},
    {label: 'Create a recipe', text: 'using ingredients from my kitchen', onClick: ()=>{this.messagingService.sendMessage("Could you ask me to list five ingredients from my pantry, and then help me invent a new recipe using them?")}},
  ]

  randomTasks: ClickableCardComponent[] = [];
  
  ngOnInit() {
    this.randomTasks =  this.tasks.sort(() => Math.random() - Math.random()).slice(0, 4)
  }

  inputSuggestion(message: string) {
    this.selectedSuggestion.emit(message);
  }
  
  getSuggestions() {
    const filteredSuggestions = this.isShowingAll ? this.suggestions : this.suggestions.slice(0, 5);
    
    return this.isShowingAll 
    ? filteredSuggestions 
    : filteredSuggestions.concat({ icon: 'none', label: 'More', onClick: () => { this.showMore(); } });
  }
  
  showMore() {
    this.isShowingAll = true;
  }
}
