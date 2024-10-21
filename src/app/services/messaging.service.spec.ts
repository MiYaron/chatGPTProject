import { CookieService } from 'ngx-cookie-service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
  let service: MessagingService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(MessagingService);
    cookieService = TestBed.inject(CookieService);
    
    service.resetChat();
    cookieService.deleteAll();
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

      service.sendMessage('Keep Testing');

      service.activeChat.subscribe((messages) => {
        if(messages[3].content.length > 0) {
          expect(messages.length).toBe(4);
          done();
        }
      });
    }
  )

  it ('should response that key is invalid', (done) => {
    let isMessageSent = false;

    service.activeChat.subscribe((messages) => {
      if (isMessageSent) {
        expect(messages[messages.length-1].content).toBe("I think you've provided me a wrong key");
        done();
      }
    });

    service.sendMessage("/key 12345");
    isMessageSent = true;
  });
});
