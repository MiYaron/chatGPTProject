import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBarComponent } from './message-bar.component';
import { MessagingService } from '../../services/messaging.service';
import { provideHttpClient } from '@angular/common/http';

describe('MessageBarComponent', () => {
  let component: MessageBarComponent;
  let fixture: ComponentFixture<MessageBarComponent>;
  let messagingService: MessagingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBarComponent],
      providers: [MessagingService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBarComponent);
    component = fixture.componentInstance;
    messagingService = TestBed.inject(MessagingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send message when text is empty', () => {
    const spy = spyOn(messagingService, 'sendMessage');
    component.sendMessage();

    expect(spy).not.toHaveBeenCalled();
  })

  it('should not send message when text is only spaces', () => {
    const spy = spyOn(messagingService, 'sendMessage');
    component.text = '        ';
    component.sendMessage();

    expect(spy).not.toHaveBeenCalled();
  })

  it('should add a message', (done) => {
    let isMessageSent = false;
    component.text = 'Message to be sent';

    messagingService.activeChat.subscribe((messages) => {
      if (isMessageSent) {
        expect(messages).toContain(jasmine.objectContaining({ content: 'Message to be sent' }));
        expect(messages.length).toBeGreaterThan(1);
        done();
      }
    });

    component.sendMessage();
    isMessageSent = true;
  })
});
