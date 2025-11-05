/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../data-store';
import { RatingStarsComponent } from './rating-stars.component';

@Component({
  selector: 'app-full-review-card',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent],
  template: `@if (review(); as review) {
  <div class="review-card">
    <div class="review-header">
      <h4 class="username">{{ review.username }}</h4>
      <app-rating-stars [rating]="review.rating"></app-rating-stars>
    </div>
    <p class="comment">{{ review.comment }}</p>
    <p class="timestamp">{{ review.timestamp | date:'medium' }}</p>
  </div>
}`,
  styles: [`.review-card {
  background-color: var(--surface);
  border-radius: var(--border-radius-md);
  border: var(--border-default);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-3);
  box-shadow: var(--shadow-subtle);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.username {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.comment {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--line-height-body);
  margin-bottom: var(--spacing-2);
}

.timestamp {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: right;
}
`],
})
export class FullReviewCardComponent {
  review = input<Review>();
}
