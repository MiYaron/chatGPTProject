import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
});
