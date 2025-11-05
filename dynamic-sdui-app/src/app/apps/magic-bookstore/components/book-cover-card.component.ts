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
  template: `@if (book(); as book) {
  <div class="book-card" (click)="viewDetails(book.title)">
    <div class="cover-container">
      @if (book.coverImgUrl) {
        <img [src]="book.coverImgUrl" alt="Cover of {{ book.title }}" class="book-cover">
      } @else {
        <mat-spinner diameter="50"></mat-spinner>
      }
      @if (book.bestsellerRank) {
        <app-bestseller-ribbon [rank]="book.bestsellerRank"></app-bestseller-ribbon>
      }
    </div>
    <div class="book-info">
      <h3 class="book-title">{{ book.title }}</h3>
      @if (book.authors && book.authors.length > 0) {
        <p class="book-author">{{ book.authors[0].name }}</p>
      }
      <div class="rating-price-container">
        @if (book.averageRating) {
          <app-rating-stars [rating]="book.averageRating"></app-rating-stars>
        }
        <div class="price-container">
          @if (book.salePrice) {
            <span class="original-price">{{ book.price | currency:'USD':'symbol':'1.2-2' }}</span>
            <span class="sale-price">{{ book.salePrice | currency:'USD':'symbol':'1.2-2' }}</span>
          } @else {
            <span class="price">{{ book.price | currency:'USD':'symbol':'1.2-2' }}</span>
          }
        </div>
      </div>
    </div>
  </div>
}`,
  styles: [`.book-card {
  background-color: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: var(--transition-default);
  border: var(--border-default);
}

.book-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.cover-container {
  position: relative;
  width: 100%;
  padding-bottom: 150%; /* Aspect ratio for book covers */
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
}

.book-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
}

mat-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --mdc-circular-progress-active-indicator-color: var(--primary);
}

.book-info {
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.book-title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
}

.rating-price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Pushes to the bottom */
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-1);
}

.price {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}

.original-price {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-decoration: line-through;
}

.sale-price {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--error); /* Use error color for sale price to make it stand out */
}
`],
})
export class BookCoverCardComponent {
  chatService = inject(ChatService);
  book = input<Book>();

  viewDetails(bookTitle: string) {
    this.chatService.addUserPrompt(`Tell me more about the book "${bookTitle}"`);
  }
}
