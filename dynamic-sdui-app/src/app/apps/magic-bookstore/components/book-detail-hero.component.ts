/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Book } from '../data-store';
import { RatingStarsComponent } from './rating-stars.component';

@Component({
  selector: 'app-book-detail-hero',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RatingStarsComponent],
  templateUrl: './book-detail-hero.component.html',
  styleUrl: './book-detail-hero.component.css',
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
