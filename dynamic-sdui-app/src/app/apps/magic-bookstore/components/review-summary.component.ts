/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars.component';

@Component({
  selector: 'app-review-summary',
  standalone: true,
  imports: [CommonModule, RatingStarsComponent],
  template: `<div class="review-summary">
  @if (averageRating()) {
    <app-rating-stars [rating]="averageRating()"></app-rating-stars>
  }
  @if (reviewCount() !== undefined) {
    <span class="review-count">({{ reviewCount() }} reviews)</span>
  }
</div>`,
  styles: [`.review-summary {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--text-base);
  color: var(--text-secondary);
}

.review-count {
  color: var(--text-muted);
}
`],
})
export class ReviewSummaryComponent {
  averageRating = input<number>();
  reviewCount = input<number>();
}
