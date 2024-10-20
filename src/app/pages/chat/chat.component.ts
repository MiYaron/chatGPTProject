import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBarComponent } from '../../components/message-bar/message-bar.component';
import { TypewriterComponent } from '../../components/typewriter/typewriter.component';
import { MessagingService, Message } from '../../services/messaging.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageBarComponent, TypewriterComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked{
  @ViewChild('chatWindow') chatWindow!: ElementRef<HTMLDivElement>;
  messages: Message[] = [];
  typeSpeed = 0;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.activeChat.subscribe((messages) => {
      this.messages = messages;
    })
  }

  ngAfterViewChecked() {
    if (this.chatWindow) {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }
  }

  setIsTyping(isTyping: boolean) {
    this.messagingService.isTyping.next(isTyping);
  }
}
