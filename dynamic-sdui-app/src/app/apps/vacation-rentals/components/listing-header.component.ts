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
  templateUrl: './listing-header.component.html',
  styleUrls: ['./listing-header.component.css'],
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
