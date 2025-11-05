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
  template: `<div class="container">
  <div class="map-wrapper">
    <img [src]="mapImageUrl()" alt="Approximate location of the property" fill priority>
  </div>
  <p class="location-description">{{ locationDescription() }}</p>
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  padding: var(--haven-spacing-5, 32px) 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-size: var(--haven-text-xl, 24px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0 0 var(--haven-spacing-4, 24px) 0;
}

.map-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 62 / 9;
  border-radius: var(--haven-border-radius-lg, 12px);
  overflow: hidden;
  background-color: var(--haven-bg, #F9F9F9); /* Placeholder color */
}

.map-wrapper img {
  /* object-fit is not needed when using the \`fill\` attribute with NgOptimizedImage */
}

.location-description {
  font-size: var(--haven-text-base, 16px);
  line-height: var(--haven-line-height-body, 1.6);
  color: var(--haven-text-secondary, #555555);
  margin: var(--haven-spacing-4, 24px) 0 0 0;
  white-space: pre-line;
}
`],
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
