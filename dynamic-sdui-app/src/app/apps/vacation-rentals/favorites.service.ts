/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injectable, signal, WritableSignal } from '@angular/core';

export interface PropertyListing {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
  pricePerNight: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: WritableSignal<PropertyListing[]> = signal([]);

  addFavorite(listing: PropertyListing) {
    this.favorites.update(favorites => [...favorites, listing]);
  }

  removeFavorite(listing: PropertyListing) {
    this.favorites.update(favorites => favorites.filter(fav => fav.title !== listing.title));
  }
}
