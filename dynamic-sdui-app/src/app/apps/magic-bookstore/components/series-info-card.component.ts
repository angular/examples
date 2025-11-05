/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-series-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `@if (series(); as series) {
  <div class="series-card">
    <mat-icon class="series-icon">collections_bookmark</mat-icon>
    <div class="series-details">
      <span class="series-name">{{ series.name }}</span>
      <span class="series-number">Book {{ series.number }}</span>
    </div>
  </div>
}`,
  styles: [`.series-card {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--border-radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-subtle);
  border: var(--border-default);
  white-space: nowrap;
}

.series-icon {
  font-size: var(--text-lg);
  width: var(--text-lg);
  height: var(--text-lg);
}

.series-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.series-name {
  font-weight: var(--font-weight-semibold);
}

.series-number {
  font-size: var(--text-xs);
  opacity: 0.9;
}
`],
})
export class SeriesInfoCardComponent {
  series = input<{ name: string; number: number }>();
}
