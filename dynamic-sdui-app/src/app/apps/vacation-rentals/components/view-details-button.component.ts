/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, inject } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-view-details-button',
  standalone: true,
  template: `
    @if (listingName()) {
      <button (click)="viewDetails()">View Details</button>
    }
  `,
  styles: [`
    button {
      padding: var(--haven-spacing-2) var(--haven-spacing-3);
      border: none;
      background-color: var(--haven-primary);
      color: white;
      border-radius: var(--haven-border-radius-md);
      cursor: pointer;
      font-family: var(--haven-font-family);
      transition: var(--haven-transition-default);
    }
    button:hover {
        background-color: var(--haven-primary-dark);
    }
  `],
})
export class ViewDetailsButtonComponent {
  listingName = input<string>();
  private chatService = inject(ChatService);

  viewDetails(): void {
    this.chatService.addUserPrompt(`Show me detail for the ${this.listingName()} listing`);
  }
}
