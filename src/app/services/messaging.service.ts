import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

export interface Message {
  from: 'user' | 'bot';
  message: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnInit {
  private key!: string | null;
  private useMock = false;

  private messages: Message[] = [];
  messagesSubject = new BehaviorSubject<Message[]>(this.messages);

  private cancelRequest$= new Subject<void>();
  private responseTimeout: any;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.key = this.cookieService.get('api_key');
  }

  ngOnInit() {
    this.key = this.cookieService.get('api_key');
  }

  sendMessage(messageText: string) {
    const newMessage: Message = {
      from: 'user',
      message: messageText,
      time: Date.now()
    }

    this.addMessage(newMessage)
  }

  addMessage(newMessage: Message): void {
    this.messages.push(newMessage);
    this.messagesSubject.next(this.messages);

    this.responseMiddleware(newMessage.message);
  }

  
  cancelResponse() {
      clearTimeout(this.responseTimeout); 
      this.cancelRequest$.next();
      this.cancelRequest$.complete();
      this.isLoading.next(false);
  }

  resetChat() {
      this.messages.length = 0;
      this.messagesSubject.next(this.messages);
      clearTimeout(this.responseTimeout); 
      this.isLoading.next(false);
  }

  private responseMiddleware(message: string) {
    this.isLoading.next(true);
    const keyword = message.split(" ")[0];

    switch(keyword) {
      case "/useMock":
        this.useMock = true;
        this.generateResponseMock();
        break;
      case "/stopMock":
        this.useMock = false;
        this.askForKey();
        break;
      case "/key":
        this.key = message.split(" ")[1];
        this.cookieService.set('api_key', this.key, { secure: true });
        this.generateResponse(`Hey GPT! Please tell me what can i do with you`);
        break;
      case "/help":
        this.giveHelp();
        break;
      default:
        if (this.useMock) {
          this.generateResponseMock();
        } else if(this.key) {
          this.generateResponse(message);
        } else {
          this.askForKey();
        }
    }
  }

  private generateResponse(content: string) {
    const model = "gpt-4o-mini";
    const messages = [{role: "user", content}];
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.key}`,
      'Content-type': 'application/json; charset=UTF-8',
    });
    const botMessage: Message = {
      from: 'bot',
      message: '',
      time: Date.now()
    };

    this.messages.push(botMessage);
    this.messagesSubject.next(this.messages);

    this.http.post(`https://api.openai.com/v1/chat/completions`, { model, messages }, { headers }).pipe(
      takeUntil(this.cancelRequest$),
      map((response: any) => {
        return response.choices[0]?.message?.content || '';
      })
    ).subscribe({
      next: (responseMessage: string) => {
        this.messages[this.messages.length - 1].message = responseMessage;
        this.messagesSubject.next(this.messages);
        this.isLoading.next(false);
        this.cancelRequest$.complete();
      },
      error: (error) => {
        if (error.status === 401) {
          console.log (this.key);
          this.messages[this.messages.length - 1].message = `I think you've provided me a wrong key`;
          this.messagesSubject.next(this.messages);
        } else {
          this.messages[this.messages.length - 1].message = `I'm Sorry, somthing went wrong, i can't respond to this`;
          this.messagesSubject.next(this.messages);
        }

        this.isLoading.next(false);
        this.cancelRequest$.complete();
      }
    });
  }

  private generateResponseMock() {
    const botMessage: Message = {
      from: 'bot',
      message: '',
      time: Date.now()
    };
    this.messages.push(botMessage);
    this.messagesSubject.next(this.messages);

    const botResponses: string[] = [
      "Hello! How can I help you?",
      "That's interesting!",
      "Can you tell me more?",
      "I'm here to assist you!",
      "What else do you need?",
      "You can enter your API key so i stop giving you random answers!",
      "If you want to stop using mock, just type '/stopMock'",
      "You can give me an API key anytime by typing '/key API_KEY'",
      "If you want to know more just send '/help'!"
    ];

    this.responseTimeout = setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];

      this.messages[this.messages.length-1].message = response;
      this.messagesSubject.next(this.messages)
      this.isLoading.next(false);

    }, 800);
  }

  private askForKey() {
    this.isLoading.next(true);
    const botMessage: Message = {
      from: 'bot',
      message: '',
      time: Date.now()
    };
    this.messages.push(botMessage);
    this.messagesSubject.next(this.messages);


    this.responseTimeout = setTimeout(() => {
      const response = `If you want to use a real GPT bot please give me an api key. send "/help" for more information`

      this.messages[this.messages.length-1].message = response;
      this.messagesSubject.next(this.messages)
      this.isLoading.next(false);

    }, 400);
  }

  private giveHelp() {
    this.isLoading.next(true);
    const botMessage: Message = {
      from: 'bot',
      message: '',
      time: Date.now()
    };
    this.messages.push(botMessage);
    this.messagesSubject.next(this.messages);


    this.responseTimeout = setTimeout(() => {
      const response = `Commands:
      "/help" - Get all available commands
      "/key API_KEY" - start using real GPT Bot
      "/useMock" - use a mock that gives random answers
      "/stopMock" - stop using mock service`

      this.messages[this.messages.length-1].message = response;
      this.messagesSubject.next(this.messages)
      this.isLoading.next(false);

    }, 400);
  }
}