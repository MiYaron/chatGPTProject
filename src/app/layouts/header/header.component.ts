import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { SmallButtonComponent } from '../../components/small-button/small-button.component';
import { MessagingService } from '../../services/messaging.service';
import { SideheaderComponent } from '../../components/sideheader/sideheader.component';
import { AuthComponent } from '../../components/auth/auth.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuButtonComponent, SmallButtonComponent, SideheaderComponent, AuthComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
