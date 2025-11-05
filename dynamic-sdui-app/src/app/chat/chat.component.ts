/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, effect, ElementRef, inject, HostBinding } from '@angular/core';
import { ChatService } from './chat.service';
import { MagicAiService } from '../magic-ai/magic-ai.service';
import { FormsModule } from '@angular/forms';
import { APP_CONTEXT } from '../magic-ai/app-context';
import { FormatInlineCodePipe } from '../pipes/format-inline-code.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, FormatInlineCodePipe],
  template: `
    <div class="chat-container">
      <h2>Chat</h2>
      <div class="messages">
        @if (conversationHistory().length === 0) {
          <div class="welcome-message">
            <p>{{welcomeText}}</p>
          </div>
        } @else {
          @for (message of conversationHistory(); track $index) {
            <div class="message" [class.user-message]="message.author === 'user'" [class.agent-message]="message.author === 'agent'">
              <p [innerHTML]="message.text | formatInlineCode"></p>
            </div>
          }
        }
      </div>
      <div class="chat-input">
        <textarea placeholder="Type a message..." [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" (input)="onInput($event)"></textarea>
        <button class="send-button" [disabled]="!isStreamComplete()" (click)="sendMessage()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="send-icon">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0; /* Prevent the component from growing beyond its container */
      background-color: var(--background);
      border-left: var(--border-default);
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--spacing-3);
      box-sizing: border-box;
    }
    h2 {
      margin-top: 0;
      font-size: var(--text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--primary);
      border-bottom: var(--border-default);
      padding-bottom: var(--spacing-2);
      margin-bottom: var(--spacing-3);
    }
    .messages {
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: var(--spacing-3);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
    }
    .welcome-message {
      text-align: center;
      padding: var(--spacing-4);
      border-radius: var(--border-radius-lg);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }
    .message {
      display: flex;
      flex-direction: column;
      max-width: 80%;
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--border-radius-lg);
      line-height: var(--line-height-body);
    }
    .message p {
      margin: 0;
    }
    .message strong {
      font-weight: var(--font-weight-semibold);
      display: block;
      margin-bottom: var(--spacing-1);
      font-size: var(--text-sm);
    }
    .user-message {
      background-color: var(--primary);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: var(--spacing-1);
    }
    .agent-message {
      background-color: var(--surface);
      color: var(--text-primary);
      align-self: flex-start;
      border: var(--border-default);
      border-bottom-left-radius: var(--spacing-1);
    }
    .chat-input {
      display: flex;
      gap: var(--spacing-2);
      border-top: var(--border-default);
      padding-top: var(--spacing-3);
      align-items: flex-end; /* Align items to the top */
    }
    .chat-input textarea {
      flex-grow: 1;
      padding: var(--spacing-2);
      border: var(--border-default);
      border-radius: var(--border-radius-md);
      font-family: var(--font-family);
      transition: var(--transition-default);
      resize: none; /* Prevent manual resizing */
      overflow-y: auto; /* Show scrollbar when content overflows */
      min-height: 24px; /* Set a reasonable min-height */
      line-height: 1.5;
    }
    .chat-input textarea:focus {
      outline: none;
      box-shadow: var(--shadow-focus);
      border-color: var(--primary);
    }
    .send-button {
      padding: var(--spacing-2);
      color: var(--primary);
      border: 1px solid #DCDCDC;
      background-color: transparent;
      border-radius: var(--border-radius-md);
      cursor: pointer;
    }
    .send-button:hover {
        background-color: var(--border);
    }
    .send-button:disabled {
      background-color: var(--surface-2);
      color: var(--text-secondary);
      cursor: not-allowed;
    }
    .send-icon {
      width: 28px;
      height: 48px;
      fill: currentColor;
    }
  `]
})
export class ChatComponent {
  private chatService = inject(ChatService);
  private magicAiService = inject(MagicAiService);
  isStreamComplete = this.magicAiService.isStreamComplete;
  newMessage = '';
  conversationHistory = this.chatService.conversationHistory;
  theme = APP_CONTEXT.theme;
  welcomeText = APP_CONTEXT.welcomeText;

  @HostBinding('class') get themeClass() {
    return `${this.theme}-theme`;
  }

  constructor(private elementRef: ElementRef) {
    effect(() => {
      // This effect runs when the conversation history changes.
      this.conversationHistory();

      // We use a setTimeout to schedule the scroll operation after Angular
      // has finished updating the DOM with the new message.
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  private scrollToBottom(): void {
    try {
      const messagesContainer = this.elementRef.nativeElement.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.addUserPrompt(this.newMessage);
      this.newMessage = '';
      // Reset height after sending
      const textarea = this.elementRef.nativeElement.querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to calculate new scrollHeight
    
    const computedStyle = getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const maxHeight = lineHeight * 5;

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Ensure it scrolls to the bottom if maxHeight is reached
    if (textarea.scrollHeight > maxHeight) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  }
}
