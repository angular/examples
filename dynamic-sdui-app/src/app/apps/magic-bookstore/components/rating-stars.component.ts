/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Assuming Material Icons are available

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `<div class="star-rating">
  @for (star of [].constructor(maxStars); track $index) {
    <mat-icon class="star-icon" [class.filled]="getStarIcon($index) === 'star'" [class.half-filled]="getStarIcon($index) === 'star_half'">
      {{ getStarIcon($index) }}
    </mat-icon>
  }
</div>`,
  styles: [`.star-rating {
  display: flex;
  align-items: center;
  color: var(--accent-gold); /* Gold color for stars */
}

.star-icon {
  font-size: var(--text-lg); /* Adjust size as needed */
  width: var(--text-lg);
  height: var(--text-lg);
  color: var(--text-muted); /* Default for empty stars */
}

.star-icon.filled, .star-icon.half-filled {
  color: var(--accent-gold);
}
`],
})
export class RatingStarsComponent {
  rating = input<number>();
  maxStars = 5;

  fullStars = computed(() => Math.floor(this.rating() || 0));
  hasHalfStar = computed(() => (this.rating() || 0) % 1 >= 0.5);
  emptyStars = computed(() => this.maxStars - this.fullStars() - (this.hasHalfStar() ? 1 : 0));

  getStarIcon(starIndex: number): string {
    if (starIndex < this.fullStars()) {
      return 'star';
    } else if (starIndex === this.fullStars() && this.hasHalfStar()) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }
}
