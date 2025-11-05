/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Award } from '../data-store';

@Component({
  selector: 'app-award-badge',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `@if (award(); as award) {
  <div class="award-badge">
    <mat-icon class="award-icon">emoji_events</mat-icon> <!-- Trophy icon -->
    <div class="award-details">
      <span class="award-name">{{ award.name }}</span>
      <span class="award-year-org">{{ award.year }} - {{ award.organization }}</span>
    </div>
  </div>
}`,
  styles: [`.award-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  background-color: var(--accent-gold);
  color: var(--surface);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--border-radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-subtle);
  white-space: nowrap;
}

.award-icon {
  font-size: var(--text-lg);
  width: var(--text-lg);
  height: var(--text-lg);
}

.award-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.award-name {
  font-weight: var(--font-weight-semibold);
}

.award-year-org {
  font-size: var(--text-xs);
  opacity: 0.9;
}
`],
})
export class AwardBadgeComponent {
  award = input<Award>();
}
