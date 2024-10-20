import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionsComponent } from './suggestions.component';
import { MessagingService } from '../../services/messaging.service';
import { provideHttpClient } from '@angular/common/http';

describe('SuggestionsComponent', () => {
  let component: SuggestionsComponent;
  let fixture: ComponentFixture<SuggestionsComponent>;
  let messagingService: MessagingService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionsComponent);
    component = fixture.componentInstance;
    messagingService = TestBed.inject(MessagingService);    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 items in the array', () => {
    const suggestions = component.getSuggestions();
    expect(suggestions.length).toBe(6);
  });

  it('should have 7 items in the array after showMore', () => {
    const showMoreButton = component.getSuggestions().find(suggestion => suggestion.label === 'More');
    if (showMoreButton && typeof showMoreButton.onClick === 'function') {
      showMoreButton.onClick();
    }
    
    const suggestions = component.getSuggestions();
    expect(suggestions.length).toBe(7);
  });

  it('should automatically send task message', (done) => {
    let isMessageSent = false;

    messagingService.activeChat.subscribe((messages) => {
      if (isMessageSent) {
        expect(messages.length).toBe(2);
        done();
      }
    });

    component.getRandomTasks()[0].onClick();
    isMessageSent = true;
  })
});
