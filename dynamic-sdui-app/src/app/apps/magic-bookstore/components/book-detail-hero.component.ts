/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../data-store';
import { RatingStarsComponent } from './rating-stars.component';
import { BestsellerRibbonComponent } from './bestseller-ribbon.component';

@Component({
  selector: 'app-book-detail-hero',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent, BestsellerRibbonComponent],
  template: `@if (book(); as book) {
  <div class="hero-section">
    <div class="cover-image-container">
      @if (book.coverImgUrl) {
        <img [src]="book.coverImgUrl" alt="Cover of {{ book.title }}" class="book-cover-hero">
      }
      @if (book.bestsellerRank) {
        <app-bestseller-ribbon [rank]="book.bestsellerRank"></app-bestseller-ribbon>
      }
    </div>
    <div class="details-container">
      <h1 class="book-title">{{ book.title }}</h1>
      @if (book.subtitle) {
        <h2 class="book-subtitle">{{ book.subtitle }}</h2>
      }
      @if (authorNames()) {
        <p class="authors">by {{ authorNames() }}</p>
      }
      <div class="rating-publisher-info">
        @if (book.averageRating) {
          <app-rating-stars [rating]="book.averageRating"></app-rating-stars>
        }
        @if (book.publisher) {
          <span class="publisher-info">
            Published by {{ book.publisher.name }} on {{ book.publicationDate | date:'longDate' }}
          </span>
        }
      </div>
      <div class="price-action-container">
        <div class="price-display">
          @if (book.salePrice) {
            <span class="original-price">{{ book.price | currency:'USD':'symbol':'1.2-2' }}</span>
            <span class="sale-price">{{ book.salePrice | currency:'USD':'symbol':'1.2-2' }}</span>
          } @else {
            <span class="price">{{ book.price | currency:'USD':'symbol':'1.2-2' }}</span>
          }
        </div>
        <button class="add-to-cart-button" (click)="addToCart()">Add to Cart</button>
      </div>
    </div>
  </div>
}`,
  styles: [`.hero-section {
  display: flex;
  gap: var(--spacing-6);
  padding: var(--spacing-6);
  background-color: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  align-items: flex-start;
  margin-bottom: var(--spacing-5);
}

.cover-image-container {
  position: relative;
  flex-shrink: 0;
  width: 300px; /* Fixed width for the cover */
  height: 450px; /* Aspect ratio for book covers */
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-medium);
}

.book-cover-hero {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
}

.details-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: var(--text-xxl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
  line-height: var(--line-height-heading);
}

.book-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-3);
  line-height: var(--line-height-heading);
}

.authors {
  font-size: var(--text-lg);
  color: var(--text-primary);
  margin-bottom: var(--spacing-3);
}

.rating-publisher-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.price-action-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-top: auto; /* Pushes to the bottom */
  padding-top: var(--spacing-4);
  border-top: var(--border-default);
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
}

.price {
  font-size: var(--text-xxl);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}

.original-price {
  font-size: var(--text-lg);
  color: var(--text-muted);
  text-decoration: line-through;
}

.sale-price {
  font-size: var(--text-xxl);
  font-weight: var(--font-weight-semibold);
  color: var(--error);
}

.add-to-cart-button {
  background-color: var(--primary);
  color: var(--surface);
  padding: var(--spacing-3) var(--spacing-5);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-default);
  box-shadow: var(--shadow-subtle);
}

.add-to-cart-button:hover {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-medium);
}

.add-to-cart-button:active {
  transform: translateY(1px);
}
`],
})
export class BookDetailHeroComponent {
  book = input<Book>();

  authorNames = computed(() => {
    const book = this.book();
    return (book?.authors && book.authors.length > 0)
      ? book.authors.map(a => a.name).join(', ')
      : '';
  });

  addToCart() {
    console.log('Add to cart clicked for:', this.book()?.title);
  }
}
