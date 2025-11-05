/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  template: `<div class="pagination-container">
  <div class="summary">
    Showing 
    <strong>{{ itemsPerPage() * (currentPage() - 1) + 1 }}</strong>
    - 
    <strong>{{ Math.min(itemsPerPage() * currentPage(), totalItems()) }}</strong> 
    of 
    <strong>{{ totalItems() }}</strong>
  </div>
  <div class="controls">
    <button class="arrow-button" [disabled]="currentPage() === 1" (click)="previousPage()">
      <span class="material-icons">chevron_left</span>
    </button>
    <div class="page-numbers">
      @for (page of [].constructor(totalPages()); track $index) {
        <button 
          class="page-button" 
          [class.active]="currentPage() === $index + 1"
          (click)="goToPage($index + 1)">
          {{ $index + 1 }}
        </button>
      }
    </div>
    <button class="arrow-button" [disabled]="currentPage() === totalPages()" (click)="nextPage()">
      <span class="material-icons">chevron_right</span>
    </button>
  </div>
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--haven-spacing-3, 16px) 0;
}

.summary {
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-secondary, #555555);
}

.summary strong {
  color: var(--haven-text-primary, #222222);
}

.controls {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
}

.page-numbers {
  display: flex;
  gap: var(--haven-spacing-2, 8px);
}

.arrow-button, .page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--haven-border-default, 1px solid #EAEAEA);
  background-color: var(--haven-surface, #FFFFFF);
  color: var(--haven-text-secondary, #555555);
  cursor: pointer;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
  font-family: var(--haven-font-family, sans-serif);
  font-weight: var(--haven-font-weight-medium, 500);
}

.arrow-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.page-button {
  min-width: 36px;
  height: 36px;
  padding: 0 var(--haven-spacing-2, 8px);
  border-radius: var(--haven-border-radius-md, 8px);
  font-size: var(--haven-text-sm, 14px);
}

.arrow-button:hover, .page-button:hover {
  border-color: var(--haven-primary, #007A7A);
  color: var(--haven-primary, #007A7A);
}

.arrow-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--haven-text-secondary, #F9F9F9);
}

.page-button.active {
  background-color: var(--haven-primary, #007A7A);
  border-color: var(--haven-primary, #007A7A);
  color: var(--haven-surface, #FFFFFF);
}
`],
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
