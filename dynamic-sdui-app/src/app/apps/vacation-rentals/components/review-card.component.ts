/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';

export type Review = {
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  rating: number;
  text: string;
};

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [RatingStarsComponent],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  review = input<Review>({
    author: {
      name: '',
      avatarUrl: '',
    },
    date: '',
    rating: 0,
    text: '',
  });
}
