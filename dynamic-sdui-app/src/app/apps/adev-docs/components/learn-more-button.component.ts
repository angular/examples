/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';
import { FormatInlineCodePipe } from '../../../pipes/format-inline-code.pipe';

@Component({
  selector: 'app-learn-more-button',
  imports: [FormatInlineCodePipe],
  standalone: true,
  template: `
    @if (buttonText() && topic()) {
      <button (click)="learnMore()" [innerHTML]="buttonText() | formatInlineCode"></button>
    }
  `,
  styles: [`
    button {
      background-color: var(--adev-docs-primary);
      color: white;
      border: none;
      padding: var(--adev-docs-spacing-2) var(--adev-docs-spacing-3);
      border-radius: var(--adev-docs-border-radius-md);
      font-weight: var(--adev-docs-font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    button:hover {
      background-color: var(--adev-docs-primary-dark);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnMoreButtonComponent {
  private chatService = inject(ChatService);

  buttonText = input<string>();
  topic = input<string>();

  learnMore() {
    if (this.topic()) {
      this.chatService.addUserPrompt(`Teach me more about ${this.topic()}`);
    }
  }
}
