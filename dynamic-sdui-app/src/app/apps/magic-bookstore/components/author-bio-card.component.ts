/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Author } from '../data-store';

@Component({
  selector: 'app-author-bio-card',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `@if (author(); as author) {
  <div class="author-card">
    <div class="author-image-container">
      @if (author.imageUrl) {
        <img [src]="author.imageUrl" alt="Photo of {{ author.name }}" class="author-image">
      } @else {
        <mat-spinner diameter="50"></mat-spinner>
      }
    </div>
    <div class="author-info">
      <h3 class="author-name">{{ author.name }}</h3>
      <p class="author-bio">{{ author.bio }}</p>
    </div>
  </div>
}`,
  styles: [`.author-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  border: var(--border-default);
}

.author-image-container {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-subtle);
}

.author-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

mat-spinner {
  --mdc-circular-progress-active-indicator-color: var(--primary);
}

.author-info {
  flex-grow: 1;
}

.author-name {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
}

.author-bio {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--line-height-body);
  max-height: 150px; /* Limit height for scrollable bio */
  overflow-y: auto;
  padding-right: var(--spacing-1); /* For scrollbar */
}
`],
})
export class AuthorBioCardComponent {
  author = input<Author>();
}
