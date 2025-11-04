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
  templateUrl: './filter-chip.component.html',
  styleUrls: ['./filter-chip.component.css'],
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
