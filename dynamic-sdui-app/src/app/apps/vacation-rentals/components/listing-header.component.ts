/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';
import { FavoritesService, PropertyListing } from '../favorites.service';

@Component({
  selector: 'app-listing-header',
  standalone: true,
  imports: [RatingStarsComponent],
  template: `<div class="header-container">
  <div class="title-section">
    <h1>{{ listingTitle() }}</h1>
    <div class="sub-header">
      <app-rating-stars [rating]="rating()" [reviewCount]="reviewCount()" />
      <span class="separator">·</span>
      <a href="#" class="location-link">{{ location() }}</a>
    </div>
  </div>
  <div class="actions-section">
    <button class="action-button">
      <span class="material-icons">ios_share</span>
      <span>Share</span>
    </button>
    <button class="action-button" (click)="toggleFavorite()">
      @if (isFavorite()) {
        <span class="material-icons">favorite</span>
        <span>Saved</span>
      } @else {
        <span class="material-icons">favorite_border</span>
        <span>Save</span>
      }
    </button>
  </div>
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  padding: var(--haven-spacing-5, 32px) 0;
  border-bottom: var(--haven-border-default, 1px solid #EAEAEA);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--haven-spacing-4, 24px);
  padding: 0 20px;
}

.title-section h1 {
  font-size: var(--haven-text-xxl, 32px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  line-height: var(--haven-line-height-heading, 1.2);
  margin: 0 0 var(--haven-spacing-2, 8px) 0;
}

.sub-header {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
  font-size: var(--haven-text-sm, 14px);
}

.separator {
  color: var(--haven-text-secondary, #555555);
}

.location-link {
  color: var(--haven-text-secondary, #555555);
  font-weight: var(--haven-font-weight-medium, 500);
  text-decoration: underline;
}

.actions-section {
  display: flex;
  gap: var(--haven-spacing-3, 16px);
  flex-shrink: 0; /* Prevents action buttons from wrapping */
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--haven-spacing-2, 8px);
  border-radius: var(--haven-border-radius-md, 8px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-text-primary, #222222);
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.action-button:hover {
  background-color: var(--haven-bg, #F9F9F9);
}

.action-button .material-icons {
  font-size: 20px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingHeaderComponent {
  listingTitle = input<string>('');
  location = input<string>('');
  rating = input<number>(0);
  reviewCount = input<number>(0);

  private favoritesService = inject(FavoritesService);

  isFavorite = computed(() => 
    this.favoritesService.favorites().some(fav => fav.title === this.listingTitle())
  );

  toggleFavorite() {
    const listing: PropertyListing = {
      title: this.listingTitle(),
      location: this.location(),
      rating: this.rating(),
      reviewCount: this.reviewCount(),
      imageUrls: ['public/bali.jpeg'],
      pricePerNight: 150,
    };

    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(listing);
    } else {
      this.favoritesService.addFavorite(listing);
    }
  }
}
