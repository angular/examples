/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Injectable, inject, computed, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';

import { MagicAiService } from '../magic-ai/magic-ai.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private router = inject(Router);
  private magicAiService = inject(MagicAiService);
  conversationHistory = linkedSignal<string|undefined, Message[]>({
    source: () => this.magicAiService.agentResponse(),
    computation: (agentResponse, prev) => {
      if (!agentResponse) {
        return prev?.value || [];
      }

      const message: Message = { author: 'agent', text: agentResponse };
      if (prev && prev?.value.at(-1)?.author === 'agent') {
        const newHistory: Message[] = prev.value.slice(0, -1);
        return [...newHistory, message];
      } else if (!prev || prev?.value.length === 0) {
        return [message];
      } else {
        return [...prev.value, message];
      }
    }
  });

  nextIndex = computed(() => this.conversationHistory()
    .filter(message => message.author === 'agent').length);

  addUserPrompt(newPrompt: string): void {
    if (!this.magicAiService.isStreamComplete()) {
      return;
    }

    this.magicAiService.prompt.set(newPrompt);
    this.router.navigate([`/magic/${this.nextIndex()}`]);
    this.addToConversation({ author: 'user', text: newPrompt });
  }

  addToConversation(message: Message): void {
    this.conversationHistory.update(history => {
      if (!history.length) {
        return [message];
      } else if (history[history.length - 1].text === message.text) {
        return history;
      } else {
        return [...history, message]
      }
    });
  }
}

export interface Message {
  author: 'user' | 'agent';
  text: string;
}
