/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-chip',
  standalone: true,
  imports: [],
  template: `@if (icon(); as iconName) {
  <span class="material-icons">{{ iconName }}</span>
}
<span>{{ filterName() }}</span>`,
  styles: [`
:host {
  display: inline-flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  padding: var(--haven-spacing-2, 8px) var(--haven-spacing-3, 16px);
  border-radius: 9999px; /* Creates the "pill" shape */
  border: var(--haven-border-default, 1px solid #EAEAEA);
  background-color: var(--haven-surface, #FFFFFF);
  color: var(--haven-text-secondary, #555555);
  cursor: pointer;
  user-select: none;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

:host(:hover) {
  border-color: var(--haven-text-primary, #222222);
  color: var(--haven-text-primary, #222222);
}

:host.selected {
  background-color: var(--haven-text-primary, #222222);
  color: var(--haven-surface, #FFFFFF);
  border-color: var(--haven-text-primary, #222222);
}

.material-icons {
  font-size: 18px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'isSelected()',
    '(click)': 'toggleSelection()'
  },
})
export class FilterChipComponent {
  filterName = input<string>();
  icon = input<string>();
  isSelected = input<boolean>(false);

  // This is a placeholder for interactivity. In a real app, this would
  // likely be an @Output() event emitter.
  toggleSelection() {
    console.log(`Toggled selection for: ${this.filterName()}`);
  }
}
