/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestseller-ribbon',
  standalone: true,
  imports: [CommonModule],
  template: `@if (rank(); as rank) {
  <div class="bestseller-ribbon">
    Bestseller #{{ rank }}
  </div>
}`,
  styles: [`.bestseller-ribbon {
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  background-color: var(--accent-gold);
  color: var(--surface);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  z-index: 10;
  box-shadow: var(--shadow-subtle);
}
`],
})
export class BestsellerRibbonComponent {
  rank = input<number>();
}
