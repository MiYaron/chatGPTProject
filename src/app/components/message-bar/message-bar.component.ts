import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.css'
})
export class MessageBarComponent {
  @Input() text = '';
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  isLoadingResponse = false;
  isTypingResponse = false;

  constructor(private messagingService: MessagingService) {
    this.messagingService.isLoading.subscribe(isLoading => {
      this.isLoadingResponse = isLoading;
    });
    this.messagingService.isTyping.subscribe(isTyping => {
      this.isTypingResponse = isTyping;
    });
  }

  resizeTextArea() {
    const textarea = this.textarea.nativeElement;
    const maxHeight = 220;

    textarea.style.height = 'auto'; 
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflow = 'auto';
    } else {
      textarea.style.overflow = 'hidden';
    }
  }

  setInputMessage(message: string) {
    this.text = message;
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    }
  }

  sendMessage() {
    if (this.text.trim() !== '') {
      this.messagingService.sendMessage(this.text);
      this.text = '';
    }
  }
  
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    }
  }

  cancelResponse() {
    this.messagingService.cancelResponse();
  }

  isResponseInProgress() {
    return this.isLoadingResponse || this.isTypingResponse;
  }
}
