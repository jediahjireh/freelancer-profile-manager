import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // notification
  messages: Message[] = [];

  public addMessage(severity: string, summary: string, detail: string) {
    this.messages = [{ severity, summary, detail }];

    // automatically clear the message after 5 seconds
    setTimeout(() => {
      this.messages = [];
    }, 5000);
  }

  public getMessages(): Message[] {
    return this.messages;
  }
}
