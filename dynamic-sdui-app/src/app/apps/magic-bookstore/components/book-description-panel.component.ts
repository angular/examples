/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-description-panel',
  standalone: true,
  imports: [CommonModule],
  template: `@if (description(); as description) {
  <div class="description-panel">
    <h3 class="panel-title">Description</h3>
    <p class="book-description">
      {{ displayDescription }}
    </p>
    @if (showToggle) {
      <button class="read-more-button" (click)="toggleExpand()">
        {{ isExpanded() ? 'Read Less' : 'Read More' }}
      </button>
    }
  </div>
}`,
  styles: [`.description-panel {
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

.book-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--line-height-body);
  margin-bottom: var(--spacing-3);
}

.read-more-button {
  background: none;
  border: none;
  color: var(--primary);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  padding: 0;
  transition: var(--transition-default);
}

.read-more-button:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}
`],
})
export class BookDescriptionPanelComponent {
  description = input<string>();
  isExpanded = signal(false);
  readonly maxLength = 300; // Characters before truncating

  toggleExpand() {
    this.isExpanded.update(value => !value);
  }

  get displayDescription(): string {
    const desc = this.description();
    if (!desc) {
      return '';
    }
    if (this.isExpanded() || desc.length <= this.maxLength) {
      return desc;
    }
    return desc.substring(0, this.maxLength) + '...';
  }

  get showToggle(): boolean {
    const desc = this.description();
    return !!desc && desc.length > this.maxLength;
  }
}
