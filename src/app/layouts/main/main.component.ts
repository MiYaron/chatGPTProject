import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../pages/home/home.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HomeComponent,ChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isActiveChat = false;
  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.activeChat.subscribe((messages) => {
      if (messages.length > 0) {
        this.isActiveChat = true;
      } else {
        this.isActiveChat = false;
      }
    })
  }
}
