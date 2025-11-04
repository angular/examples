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
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingStarsComponent {
  rating = input<number|undefined>();
  reviewCount = input<number|undefined>();

  fullStars = computed(() => Array(Math.floor(this.rating() ?? 0)).fill(0));
  hasHalfStar = computed(() => (this.rating() ?? 0) % 1 !== 0);
  emptyStars = computed(() => Array(5 - Math.ceil(this.rating() ?? 0)).fill(0));
}