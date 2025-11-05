/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-genre-tag-cloud',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="tag-cloud-container">
  @if (genres() && genres()!.length > 0) {
    @for (genre of genres(); track genre) {
      <button class="tag-chip genre-chip" (click)="searchByTerm(genre)">{{ genre }}</button>
    }
  }
  @if (tags() && tags()!.length > 0) {
    @for (tag of tags(); track tag) {
      <button class="tag-chip tag-chip-secondary" (click)="searchByTerm(tag)">{{ tag }}</button>
    }
  }
</div>`,
  styles: [`.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: var(--background);
  border-radius: var(--border-radius-md);
  border: var(--border-default);
}

.tag-chip {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-default);
  border: none;
  box-shadow: var(--shadow-subtle);
}

.genre-chip {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.genre-chip:hover {
  background-color: var(--primary);
  color: var(--surface);
  box-shadow: var(--shadow-medium);
}

.tag-chip-secondary {
  background-color: var(--border);
  color: var(--text-secondary);
}

.tag-chip-secondary:hover {
  background-color: var(--text-muted);
  color: var(--surface);
  box-shadow: var(--shadow-medium);
}
`],
})
export class GenreTagCloudComponent {
  chatService = inject(ChatService);
  genres = input<string[]>();
  tags = input<string[]>();

  searchByTerm(term: string) {
    this.chatService.addUserPrompt(`Show me books related to "${term}"`);
  }
}
