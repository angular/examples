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
  templateUrl: './amenity-list.component.html',
  styleUrls: ['./amenity-list.component.css'],
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
