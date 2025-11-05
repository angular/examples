/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService, PropertyListing } from '../favorites.service';
import { RatingStarsComponent } from './rating-stars.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [RatingStarsComponent, DecimalPipe],
  template: `<div class="favorites-container">
  <h2>Saved</h2>
  <div class="favorites-list">
    @for (listing of favorites(); track listing.title) {
      <div class="favorite-item">
        <div class="favorite-item-content">
          <h3>{{ listing.title }}</h3>
          <p class="location">{{ listing.location }}</p>
          <div class="rating-price">
            <app-rating-stars [rating]="listing.rating" [reviewCount]="listing.reviewCount" />
            <p class="price"><strong>{{ listing.pricePerNight | number:'1.0-0' }}</strong> / night</p>
          </div>
        </div>
        <button class="favorite-toggle" (click)="toggleFavorite(listing)">
          <span class="material-icons">favorite</span>
        </button>
      </div>
    } @empty {
      <p class="empty-state">You haven't favorited any listings yet.</p>
    }
  </div>
</div>`,
  styles: [`h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.favorite-item {
  background-color: var(--haven-surface);
  border: var(--haven-border-default);
  border-radius: var(--haven-border-radius-lg);
  padding: var(--haven-spacing-4);
  box-shadow: var(--haven-shadow-subtle);
  transition: var(--haven-transition-default);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.favorite-item:hover {
  box-shadow: var(--haven-shadow-medium);
  transform: translateY(-2px);
}

.favorite-item-content {
  flex-grow: 1;
}

.favorite-item-content h3 {
  font-size: var(--haven-text-lg);
  font-weight: var(--haven-font-weight-semibold);
  color: var(--haven-primary);
  margin: 0 0 var(--haven-spacing-1) 0;
}

.favorite-item-content .location {
  font-size: var(--haven-text-base);
  color: var(--haven-text-secondary);
  margin: 0 0 var(--haven-spacing-3) 0;
}

.rating-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: var(--haven-text-base);
  color: var(--haven-text-primary);
  margin: 0;
}

.price strong {
  font-weight: var(--haven-font-weight-semibold);
}

.empty-state {
  font-size: var(--haven-text-base);
  color: var(--haven-text-muted);
  text-align: center;
  padding: var(--haven-spacing-6) 0;
}

.favorite-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: var(--haven-spacing-3);
  color: var(--haven-error);
  transition: var(--haven-transition-default);
}

.favorite-toggle:hover {
  color: var(--haven-primary-dark);
  transform: scale(1.1);
}

.favorite-toggle .material-icons {
  font-size: 28px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  private favoritesService = inject(FavoritesService);
  favorites = this.favoritesService.favorites;

  toggleFavorite(listing: PropertyListing) {
    this.favoritesService.removeFavorite(listing);
  }
}
