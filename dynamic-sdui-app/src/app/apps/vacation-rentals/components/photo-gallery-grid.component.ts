/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-grid',
  standalone: true,
  imports: [],
  template: `@if (imageUrls(); as images) {
  <div class="gallery-grid">
    <!-- Main Image -->
    <div class="gallery-item main-image">
      <img [src]="images[0]" [alt]="propertyTitle() + ' - Main Image'" priority fill>
    </div>
    <!-- Secondary Images (display up to 4 more) -->
    @for (imageUrl of images.slice(1, 5); track $index) {
      <div class="gallery-item">
        <img [src]="imageUrl" [alt]="propertyTitle() + ' - Image ' + ($index + 2)" fill>
      </div>
    }
    @if (images.length > 5) {
      <button class="show-all-photos-button">
        <span class="material-icons">collections</span>
        Show all photos
      </button>
    }
  </div>
}`,
  styles: [`
:host {
  display: block;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr); /* Use fractional units for rows */
  aspect-ratio: 2 / 1; /* Give the whole container a defined aspect ratio */
  gap: var(--haven-spacing-2, 8px);
  border-radius: var(--haven-border-radius-lg, 12px);
  overflow: hidden; /* Ensures the images inside conform to the rounded corners */
}

.gallery-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.gallery-item:hover img {
  transform: scale(1.05);
  filter: brightness(0.9);
}

.main-image {
  grid-column: span 2;
  grid-row: span 2;
}

.show-all-photos-button {
  position: absolute;
  bottom: var(--haven-spacing-3, 16px);
  right: var(--haven-spacing-3, 16px);
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  padding: var(--haven-spacing-2, 8px) var(--haven-spacing-3, 16px);
  background-color: var(--haven-surface, #FFFFFF);
  color: var(--haven-text-primary, #222222);
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-md, 8px);
  cursor: pointer;
  box-shadow: var(--haven-shadow-subtle, 0px 4px 12px rgba(0, 0, 0, 0.05));
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.show-all-photos-button:hover {
  box-shadow: var(--haven-shadow-medium, 0px 6px 16px rgba(0, 0, 0, 0.08));
  transform: translateY(-2px);
}

.show-all-photos-button .material-icons {
  font-size: 18px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryGridComponent {
  imageUrls = input<string[]>([]);
  propertyTitle = input<string>('');
}
