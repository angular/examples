/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: `<div class="rating-container">
  <div class="stars">
    <!-- Full Stars -->
    @for (star of fullStars(); track $index) {
      <span class="star material-icons">star</span>
    }
    <!-- Half Star -->
    @if (hasHalfStar()) {
      <span class="star material-icons">star_half</span>
    }
    <!-- Empty Stars -->
    @for (star of emptyStars(); track $index) {
      <span class="star material-icons">star_border</span>
    }
  </div>
  @if (reviewCount(); as count) {
    <span class="review-count">({{ count }})</span>
  }
</div>`,
  styles: [`
.rating-container {
  display: inline-flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px); /* Gap between stars and review count */
  font-family: var(--haven-font-family, sans-serif);
}

.stars {
  display: flex;
  align-items: center;
  color: var(--haven-accent-gold, #FFB400);
}

.star {
  font-size: var(--haven-text-lg, 18px);
  /* Prevents the user from selecting the icon text */
  user-select: none; 
}

.review-count {
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-muted, #888888);
  /* Nudge the count down slightly for better visual alignment with stars */
  transform: translateY(1px);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {
  rating = input<number|undefined>();
  reviewCount = input<number|undefined>();

  fullStars = computed(() => Array(Math.floor(this.rating() ?? 0)).fill(0));
  hasHalfStar = computed(() => (this.rating() ?? 0) % 1 !== 0);
  emptyStars = computed(() => Array(5 - Math.ceil(this.rating() ?? 0)).fill(0));
}