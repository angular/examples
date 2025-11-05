/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

const MAX_VISIBLE_LINES = 3;

@Component({
  selector: 'app-listing-description',
  standalone: true,
  imports: [],
  template: `<div class="description-container">
  <p 
    class="description-text"
    [class.truncated]="!isExpanded() && maxVisibleLines()"
    [style.--max-lines]="maxVisibleLines()">
    {{ description() }}
  </p>
  @if (maxVisibleLines()) {
    <button class="toggle-button" (click)="toggleExpanded()">
      {{ isExpanded() ? 'Show less' : 'Show more' }}
      <span class="material-icons">
        {{ isExpanded() ? 'expand_less' : 'expand_more' }}
      </span>
    </button>
  }
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  padding: var(--haven-spacing-5, 32px) 0;
  padding-right: var(--haven-spacing-5, 32px);
  border-bottom: var(--haven-border-default, 1px solid #EAEAEA);
}

.description-text {
  font-size: var(--haven-text-base, 16px);
  line-height: var(--haven-line-height-body, 1.6);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
  /* Allow preserving newlines from the input string */
  white-space: pre-line;
}

.description-text.truncated {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--max-lines, 3); /* Default to 3 lines if not set */
  overflow: hidden;
}

.toggle-button {
  display: inline-flex;
  align-items: center;
  gap: var(--haven-spacing-1, 4px);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: var(--haven-spacing-3, 16px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-text-primary, #222222);
}

.toggle-button:hover {
  color: var(--haven-primary, #007A7A);
}

.toggle-button .material-icons {
  font-size: 20px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingDescriptionComponent {
  description = input<string>('');
  maxVisibleLines = signal(MAX_VISIBLE_LINES);
  isExpanded = signal(false);

  toggleExpanded(): void {
    this.isExpanded.update(expanded => !expanded);
  }
}
