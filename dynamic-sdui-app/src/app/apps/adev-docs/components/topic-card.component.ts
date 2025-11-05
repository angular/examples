/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../chat/chat.service';
import { FormatInlineCodePipe } from '../../../pipes/format-inline-code.pipe';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [CommonModule, FormatInlineCodePipe],
  template: `<div class="topic-card" (click)="updatePrompt()">
  @if (topic()) {
    <h3 [innerHTML]="topic() | formatInlineCode"></h3>
  }
  @if (description()) {
    <p [innerHTML]="description() | formatInlineCode"></p>
  }
</div>`,
  styles: [`.topic-card {
  background-color: var(--surface-container-low);
  border-radius: var(--border-radius-m);
  padding: var(--spacing-4);
  cursor: pointer;
  transition: background-color 0.3s;
}

.topic-card:hover {
  background-color: var(--surface-container);
}

h3 {
  color: var(--primary);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}

p {
  color: var(--text-secondary);
  font-size: var(--text-base);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicCardComponent {
  topic = input<string>();
  description = input<string>();

  private chatService = inject(ChatService);

  updatePrompt() {
    if (this.topic()) {
      this.chatService.addUserPrompt(`teach me about ${this.topic()}`);
    }
  }
}