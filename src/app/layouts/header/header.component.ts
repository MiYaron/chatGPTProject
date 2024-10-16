import { Component } from '@angular/core';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { SmallButtonComponent } from '../../components/small-button/small-button.component';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuButtonComponent,SmallButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private messagingService: MessagingService) {}
  
  newConversation() {
    this.messagingService.resetChat();

  }
}
