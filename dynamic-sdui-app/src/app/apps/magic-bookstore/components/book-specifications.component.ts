/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../data-store';

@Component({
  selector: 'app-book-specifications',
  standalone: true,
  imports: [CommonModule],
  template: `@if (book(); as book) {
  <div class="specifications-panel">
    <h3 class="panel-title">Book Specifications</h3>
    <div class="spec-grid">
      <div class="spec-item">
        <span class="spec-label">ISBN:</span>
        <span class="spec-value">{{ book.isbn }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Language:</span>
        <span class="spec-value">{{ book.language }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Format:</span>
        <span class="spec-value">{{ book.format }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Pages:</span>
        <span class="spec-value">{{ book.pages }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Dimensions:</span>
        @if (book.dimensions) {
          <span class="spec-value">{{ book.dimensions.height }}" H x {{ book.dimensions.width }}" W x {{ book.dimensions.depth }}" D</span>
        }
      </div>
      @if (book.edition) {
        <div class="spec-item">
          <span class="spec-label">Edition:</span>
          <span class="spec-value">{{ book.edition }}</span>
        </div>
      }
    </div>
  </div>
}`,
  styles: [`.specifications-panel {
  background-color: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  padding: var(--spacing-5);
  border: var(--border-default);
}

.panel-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-4);
  border-bottom: var(--border-default);
  padding-bottom: var(--spacing-2);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-3) var(--spacing-5);
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--spacing-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.spec-value {
  font-size: var(--text-base);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}
`],
})
export class BookSpecificationsComponent {
  book = input<Book>();
}
