import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface Message {
  role: 'user' | 'assistant' | 'mock';
  content: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private api_key!: string | null;
  private useMock = false;

  private messages: Message[] = [];
  activeChat = new BehaviorSubject<Message[]>(this.messages);

  chatHistory = new BehaviorSubject<Message[][]>([]);
  restoredIndex = -1;

  private isCanceled = false;
  private responseTimeout: any;
  isLoading = new BehaviorSubject<boolean>(false);
  isTyping = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.api_key = this.cookieService.get('api_key');

    const prevHistory = this.cookieService.get('chat_history');
    if (prevHistory) {
      this.chatHistory.next(JSON.parse(prevHistory));
    }
  }

  sendMessage(message: string) {
    this.isCanceled = false;
    this.addMessage('user', message);
    this.responseMiddleware(message);
  }

  cancelResponse() {
    this.isCanceled = true;
    const currentResponse = this.messages[this.messages.length - 1];
    currentResponse.content = ' ';
    this.activeChat.next(this.messages);

    clearTimeout(this.responseTimeout); 
    this.isLoading.next(false);
    this.isTyping.next(false);
  }

  resetChat() {
    if(this.messages.length > 0) {
      this.saveChatHistory();

      this.isCanceled = false;
      this.messages.length = 0;
      this.activeChat.next(this.messages);

      clearTimeout(this.responseTimeout); 
      this.isLoading.next(false);
      this.isTyping.next(false);
    }
  }

  restoreConversation(index: number) {
    this.messages = [...this.chatHistory.getValue()[index]];
    this.restoredIndex = index;
    this.activeChat.next(this.messages);
  }

  private saveChatHistory() {
    const history = this.chatHistory.getValue()
    const newConversation = [...this.messages];

    if (this.restoredIndex > -1) {
      history[this.restoredIndex] = newConversation;
    } else {
      history.push(newConversation)
    }
    
    this.chatHistory.next(history);
    this.cookieService.set("chat_history", JSON.stringify(this.chatHistory.getValue()));
    this.restoredIndex = -1;
  }

  private addMessage(role: 'user' | 'assistant' | 'mock', content: string): Message {
    const newMessage: Message = {
      role,
      content,
      time: Date.now()
    }

    this.messages.push(newMessage);
    this.activeChat.next(this.messages);

    return newMessage;
  }
  
  private generateResponse(message?: string) {
    const model = "gpt-4o-mini";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.api_key}`,
      'Content-type': 'application/json; charset=UTF-8',
    });

    const messages = this.messages
    .filter(({role, content}) => !content.startsWith('/') && role !== 'mock');

    if (message) {
      messages.push({role: "user", content: message, time: Date.now()});
    }

    const asstiantsMessage = this.addMessage('assistant','');

    this.http.post(`https://api.openai.com/v1/chat/completions`, { model, messages}, { headers }).subscribe({
      next: (response: any) => {
        const messageContent = response.choices[0]?.message?.content || '';
        if (!this.isCanceled) {
          asstiantsMessage.content = messageContent;

          this.activeChat.next(this.messages);

          this.isLoading.next(false);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          asstiantsMessage.content = `I think you've provided me a wrong key`;
          this.activeChat.next(this.messages);
        } else {
          asstiantsMessage.content = `I'm Sorry, somthing went wrong, i can't respond to this`;
          this.activeChat.next(this.messages);
        }

        this.isLoading.next(false);
      }
    });
  }
  

  /**********************      Mocks & Commands      **********************/

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
        this.responseMiddleware("");
        break;
      case "/key":
        this.api_key = message.split(" ")[1];
        this.cookieService.set('api_key', this.api_key, { secure: true });
        this.useMock = false;
        this.generateResponse("Tell me that my key is valid, and im now able to use GPT services");
        break;
      case "/help":
        this.giveHelp();
        break;
      default:
        if (this.useMock) {
          this.generateResponseMock();
        } else if(this.api_key) {
          this.generateResponse();
        } else {
          this.askForKey();
        }
    }
  }

  private generateResponseMock() {
    const assistantsMessage = this.addMessage('mock','');

    const botResponses: string[] = [
      "Hello! How can I help you?",
      "That's interesting!",
      "Can you tell me more?",
      "Hello! How can I assist you today?",
      "I'm here to help with any questions you might have.",
      "What topic are you interested in discussing?",
      "Feel free to ask me anything!",
      "I'm just a message away if you need support.",
      "Let's dive into your query together!",
      "I'd love to hear your thoughts!",
      "What information can I provide for you?",
      "Is there a specific subject you want to know more about?",
      "You can enter your API key so i stop giving you random answers!",
      "If you want to stop using mock, just type '/stopMock'",
      "You can give me an API key anytime by typing '/key API_KEY'",
      "If you want to know more just send '/help'!"
    ];

    this.responseTimeout = setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];

      if (!this.isCanceled) {
        assistantsMessage.content = response;
        this.activeChat.next(this.messages);
        this.isLoading.next(false);
      }
    }, 800);
  }

  private askForKey() {
    const assistantsMessage = this.addMessage('mock','');

    this.responseTimeout = setTimeout(() => {
      const response = `If you want to use a real GPT bot please give me an api key. send "/help" for more information`

      if (!this.isCanceled) {
        assistantsMessage.content = response;
        this.activeChat.next(this.messages);
        this.isLoading.next(false);
      }

    }, 400);
  }

  private giveHelp() {
    const assistantsMessage = this.addMessage('mock','');

    this.responseTimeout = setTimeout(() => {
      const response = `Commands:
      "/help" - Get all available commands
      "/key API_KEY" - start using real GPT Bot
      "/useMock" - use a mock that gives random answers
      "/stopMock" - stop using mock service`

      if (!this.isCanceled) {
        assistantsMessage.content = response;
        this.activeChat.next(this.messages);
        this.isLoading.next(false);
      }
    }, 400);
  }
}