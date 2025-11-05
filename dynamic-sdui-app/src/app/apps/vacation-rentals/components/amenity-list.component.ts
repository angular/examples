/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, signal, computed, input } from '@angular/core';

export type Amenity = {
  name: string;
  icon: string; // Material Icons key
};

const MAX_VISIBLE = 6;

@Component({
  selector: 'app-amenity-list',
  standalone: true,
  imports: [],
  template: `<div class="list-container">
  <div class="amenity-grid">
    @for (amenity of visibleAmenities(); track amenity.name) {
      <div class="amenity-item">
        @if (amenity.icon && amenity.name) {
          <div class="material-icons">{{ amenity.icon }}</div>
          <div>{{ amenity.name.trim() }}</div>
        }
      </div>
    }
  </div>

  @if (hiddenAmenitiesCount() > 0) {
    <button class="show-all-button" (click)="toggleVisibility()">
      Show all {{ amenities().length }} amenities
    </button>
  } @else if (showAll()) {
    <button class="show-all-button" (click)="toggleVisibility()">
      Show less
    </button>
  }
</div>`,
  styles: [`
:host {
  display: flex;
  font-family: var(--haven-font-family, sans-serif);
}

.list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Prevents the button from stretching to full width */
  gap: var(--haven-spacing-4, 24px); /* Controls space between grid and button */
  padding: 20px;
}

.amenity-grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%; /* Ensure grid takes full width inside the flex container */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: var(--haven-spacing-4, 24px);
  row-gap: var(--haven-spacing-3, 16px);
}

.amenity-item {
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-3, 16px);
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
}

.amenity-item .material-icons {
  font-size: 24px;
  max-width: 24px;
  color: var(--haven-text-primary, #222222);
}

.show-all-button {
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-text-primary, #222222);
  background-color: var(--haven-surface, #FFFFFF);
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-md, 8px);
  padding: var(--haven-spacing-3, 16px) var(--haven-spacing-4, 24px);
  cursor: pointer;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
  /* margin-top is removed and handled by the parent gap */
}

.show-all-button:hover {
  border-color: var(--haven-text-primary, #222222);
  background-color: var(--haven-bg, #F9F9F9);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmenityListComponent {
  amenities = input<Amenity[]>([]);

  showAll = signal(false);

  visibleAmenities = computed(() => {
    const amenities = this.amenities();
    if (MAX_VISIBLE && !this.showAll()) {
      return amenities.slice(0, MAX_VISIBLE);
    }
    return amenities;
  });

  hiddenAmenitiesCount = computed(() => {
    if (this.showAll()) {
      return 0;
    }
    const amenities = this.amenities();
    return MAX_VISIBLE ? Math.max(0, amenities.length - MAX_VISIBLE) : 0;
  });

  toggleVisibility(): void {
    this.showAll.update(showingAll => !showingAll);
  }
}
