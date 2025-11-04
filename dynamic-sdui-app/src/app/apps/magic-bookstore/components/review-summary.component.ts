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
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.css',
})
export class ReviewSummaryComponent {
  averageRating = input<number>();
  reviewCount = input<number>();
}
