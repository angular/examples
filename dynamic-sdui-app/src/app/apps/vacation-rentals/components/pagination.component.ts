/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  protected readonly Math = Math;
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  itemsPerPage = input.required<number>();
  totalItems = input.required<number>();

  // In a real app, these would emit events.
  goToPage(page: number) {
    console.log('Go to page', page);
  }

  previousPage() {
    console.log('Go to previous page');
  }

  nextPage() {
    console.log('Go to next page');
  }
}
