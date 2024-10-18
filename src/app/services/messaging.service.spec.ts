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

    service.messagesSubject.subscribe((messages) => {
      if (isMessageSent) {
        expect(messages.length).toBeGreaterThan(1);
        done();
      }
    });

    service.sendMessage("Test");
    isMessageSent = true;
  });
});
