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
  template: `@if (review(); as reviewData) {
  <div class="review-card">
    <div class="review-header">
      @if (reviewData.author && reviewData.author.avatarUrl) {
        <img [src]="reviewData.author.avatarUrl" [alt]="reviewData.author.name" class="avatar" width="48" height="48">
        <div class="author-info">
          <h5 class="author-name">{{ reviewData.author.name }}</h5>
          <p class="review-date">{{ reviewData.date }}</p>
        </div>
      }
    </div>
    <div class="review-body">
      <app-rating-stars [rating]="reviewData.rating" />
      <p class="review-text">{{ reviewData.text }}</p>
    </div>
  </div>
}`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
}

.review-card {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-3, 16px);
}

.review-header {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-3, 16px);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  line-height: 1.4;
}

.author-name {
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0;
}

.review-date {
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-muted, #888888);
  margin: 0;
}

.review-body {
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-2, 8px);
}

.review-text {
  font-size: var(--haven-text-base, 16px);
  line-height: var(--haven-line-height-body, 1.6);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Show up to 5 lines of text */
  overflow: hidden;
}
`],
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
