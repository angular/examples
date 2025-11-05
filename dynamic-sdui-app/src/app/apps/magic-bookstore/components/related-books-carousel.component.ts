/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../data-store';
import { BookCoverCardComponent } from './book-cover-card.component';

@Component({
  selector: 'app-related-books-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, BookCoverCardComponent],
  template: `@if (books() && books()!.length > 0) {
  <div class="carousel-wrapper">
    <h3 class="carousel-title">Related Books</h3>
    <div class="carousel-content">
      <button class="nav-button left" (click)="scroll('left')">
        <mat-icon>chevron_left</mat-icon>
      </button>
      <div class="carousel-container" #carouselContainer>
        @for (book of books(); track book.id) {
          <app-book-cover-card [book]="book" />
        }
      </div>
      <button class="nav-button right" (click)="scroll('right')">
        <mat-icon>chevron_right</mat-icon>
      </button>
    </div>
  </div>
}`,
  styles: [`.carousel-wrapper {
  padding: var(--spacing-5);
  background-color: var(--background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  border: var(--border-default);
}

.carousel-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-4);
  text-align: center;
}

.carousel-content {
  display: flex;
  align-items: center;
  position: relative;
}

.carousel-container {
  display: grid;
  grid-auto-flow: column; /* Arrange items in a row */
  grid-auto-columns: 250px; /* Fixed width for each card */
  gap: var(--spacing-4);
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  padding-bottom: var(--spacing-2); /* Space for scrollbar */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.carousel-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, Opera */
}

.carousel-container > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}

.nav-button {
  background-color: var(--surface);
  border: var(--border-default);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-subtle);
  transition: var(--transition-default);
  flex-shrink: 0;
  z-index: 10;
  color: var(--primary);
}

.nav-button:hover {
  background-color: var(--primary-light);
  box-shadow: var(--shadow-medium);
}

.nav-button mat-icon {
  font-size: var(--text-xl);
  width: var(--text-xl);
  height: var(--text-xl);
}

.nav-button.left {
  margin-right: var(--spacing-2);
}

.nav-button.right {
  margin-left: var(--spacing-2);
}
`],
})
export class RelatedBooksCarouselComponent {
  books = input<Book[]>();
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  scroll(direction: 'left' | 'right') {
    const container = this.carouselContainer.nativeElement;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
