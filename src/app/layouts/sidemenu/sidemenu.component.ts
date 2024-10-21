import { Message, MessagingService } from './../../services/messaging.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { SideheaderComponent } from '../../components/sideheader/sideheader.component';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, MenuButtonComponent, SideheaderComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent implements OnInit{
  @Input() isVisible = false;
  @Output() toggleVisibilty = new EventEmitter<void>();
  chatHistory: string[] = [];

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.chatHistory.subscribe((chats) => {
      this.chatHistory = chats.map((chat => chat[0]?.content || ''));
    })
  }

  toggleVisibility() {
    this.toggleVisibilty.emit();
  }

  loadConversation(index: number) {
    this.messagingService.restoreConversation(index);
  }

  newConversation() {
    this.messagingService.resetChat();
  }
}
