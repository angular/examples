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
  templateUrl: './genre-tag-cloud.component.html',
  styleUrl: './genre-tag-cloud.component.css',
})
export class GenreTagCloudComponent {
  chatService = inject(ChatService);
  genres = input<string[]>();
  tags = input<string[]>();

  searchByTerm(term: string) {
    this.chatService.addUserPrompt(`Show me books related to "${term}"`);
  }
}
