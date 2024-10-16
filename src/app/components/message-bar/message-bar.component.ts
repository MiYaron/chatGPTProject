import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagingService, Message } from '../../services/messaging.service';

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
  loadingResponse = false;

  constructor(private messagingService: MessagingService) {
    this.messagingService.isLoading.subscribe(isLoading => {
      this.loadingResponse = isLoading;
    });
  }

  resizeTextArea(event: Event): void {
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
    if (this.text !== '') {
      const newMessage: Message = {
        from: 'user',
        message: this.text,
        time: Date.now()
      }

      this.messagingService.addMessage(newMessage);
      this.text = '';
    }
  }

  cancelResponse() {
    this.messagingService.cancelResponse();
  }
}
