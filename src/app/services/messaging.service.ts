import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  from: 'user' | 'bot';
  message: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>(this.messages);
  activeChat: Observable<Message[]> = this.messagesSubject.asObservable();

  private responseTimeout: any;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  addMessage(newMessage: Message): void {
    this.messages.push(newMessage);
    this.messagesSubject.next(this.messages);

    this.generateResponse(newMessage);
  }

  generateResponse(newMessage: Message) {
    this.isLoading.next(true);
    const botResponses: string[] = [
      "Hello! How can I help you?",
      "That's interesting!",
      "Can you tell me more?",
      "I'm here to assist you!",
      "What else do you need?"
    ];

    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    const botMessage: Message = {
      from: 'bot',
      message: randomResponse,
      time: Date.now()
    };

    this.responseTimeout = setTimeout(() => {
    this.messages.push(botMessage);
    this.messagesSubject.next(this.messages);
    this.isLoading.next(false);
    }, 800);
  }

  cancelResponse() {
    if (this.responseTimeout) {
      clearTimeout(this.responseTimeout); 
      this.isLoading.next(false);
    }
  }

  resetChat() {
    this.messages.length = 0;
    this.messagesSubject.next(this.messages);
    clearTimeout(this.responseTimeout); 
    this.isLoading.next(false);
  }
}
