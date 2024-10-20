import { Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { provideHttpClient } from '@angular/common/http';

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(MessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add messages to the list', (done) => {
    let isMessageSent = false;

    service.activeChat.subscribe((messages) => {
      if (isMessageSent) {
        expect(messages.length).toBeGreaterThan(1);
        done();
      }
    });

    service.sendMessage("Test");
    isMessageSent = true;
  });

  it ('should reset the chat', (done) => {
    service.activeChat.subscribe((messages) => {
      if (messages.length > 3) {
        service.resetChat();
        expect(messages.length).toBe(0);
        done();
      }
    });

    service.sendMessage("Test");
    service.sendMessage("More test");
  })

  it ('should have valid response if new message is sent after response cancellation',
    (done) => {
      service.sendMessage("Test");

      service.cancelResponse();

      const subscription = service.activeChat.subscribe((messages) => {
        expect(messages.length).toBe(2);
        expect(messages[1].content).toBe(' ');
      });

      subscription.unsubscribe();

      service.sendMessage('Keep Testing');

      service.activeChat.subscribe((messages) => {
        if(messages[3].content.length > 0) {
          expect(messages.length).toBe(4);
          expect(messages[3].content).toBe(`If you want to use a real GPT bot please give me an api key. send "/help" for more information`)
          done();
        }
      });
    }
  )
});
