/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Book } from '../data-store';
import { ChatService } from '../../../chat/chat.service';
import { RatingStarsComponent } from './rating-stars.component';
import { BestsellerRibbonComponent } from './bestseller-ribbon.component';

@Component({
  selector: 'app-book-cover-card',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RatingStarsComponent, BestsellerRibbonComponent],
  templateUrl: './book-cover-card.component.html',
  styleUrl: './book-cover-card.component.css',
})
export class BookCoverCardComponent {
  chatService = inject(ChatService);
  book = input<Book>();

  viewDetails(bookTitle: string) {
    this.chatService.addUserPrompt(`Tell me more about the book "${bookTitle}"`);
  }
}
