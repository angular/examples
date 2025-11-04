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
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  private favoritesService = inject(FavoritesService);
  favorites = this.favoritesService.favorites;

  toggleFavorite(listing: PropertyListing) {
    this.favoritesService.removeFavorite(listing);
  }
}
