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
  templateUrl: './listing-description.component.html',
  styleUrls: ['./listing-description.component.css'],
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
