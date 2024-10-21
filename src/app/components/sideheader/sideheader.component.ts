import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-sideheader',
  standalone: true,
  imports: [MenuButtonComponent],
  templateUrl: './sideheader.component.html',
  styleUrl: './sideheader.component.css'
})
export class SideheaderComponent {
  @Input() isSidemenuVisible = false;
  @Output() toggleMenu = new EventEmitter<void>();
  constructor(private messagingService: MessagingService) {}

  newConversation() {
    this.messagingService.resetChat();
  }

  toggleSidemenu() {
    this.toggleMenu.emit();
  }
}
