import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageBarComponent } from '../../components/message-bar/message-bar.component';
import { MessagingService, Message } from '../../services/messaging.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageBarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked{
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  messages: Message[] = [];

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

}
