/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type Coordinates = {
  lat: number;
  lng: number;
};

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [],
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationMapComponent {
  coordinates = input<Coordinates>();
  locationDescription = input<string>();

  /**
   * In a real application, this URL would be constructed using a service like
   * Google Maps Static API, Mapbox, etc. For this component, we will use a
   * placeholder service that generates a visually representative map image.
   */
  mapImageUrl = computed(() => {
    const coords = this.coordinates();

    if (!coords) {
      return '';
    }
    // Using a placeholder service for demonstration
    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=1200&height=600&center=lonlat:${coords.lng},${coords.lat}&zoom=14&marker=lonlat:${coords.lng},${coords.lat};color:%23ff0000;size:medium`;
  });
}
