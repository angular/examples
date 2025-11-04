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
  templateUrl: './full-review-card.component.html',
  styleUrl: './full-review-card.component.css',
})
export class FullReviewCardComponent {
  review = input<Review>();
}
