/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatInlineCodePipe } from '../../../pipes/format-inline-code.pipe';

type CalloutType = 'info' | 'warning' | 'danger' | 'tip';

@Component({
  selector: 'adev-callout',
  standalone: true,
  imports: [CommonModule, FormatInlineCodePipe],
  template: `@if (content()) {
  <div class="callout" [ngClass]="calloutClass">
    <div class="callout-icon">
      @switch (type()) {
        @case ('info') { ℹ️ }
        @case ('warning') { ⚠️ }
        @case ('danger') { 🛑 }
        @case ('tip') { 💡 }
        @default { ℹ️ }
      }
    </div>
    <div class="callout-content" [innerHTML]="content() | formatInlineCode"></div>
  </div>
}`,
  styles: [`.callout {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-left: 5px solid;
  border-radius: var(--adev-docs-border-radius);
  margin-bottom: 1.5rem;
  background-color: var(--adev-docs-surface);
  box-shadow: var(--adev-docs-shadow);
}

.callout-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  line-height: 1;
}

.callout-content {
  flex-grow: 1;
  color: var(--adev-docs-text);
  line-height: 1.5;
}

.callout-info {
  border-color: var(--adev-docs-info);
}

.callout-warning {
  border-color: var(--adev-docs-warning);
}

.callout-danger {
  border-color: var(--adev-docs-danger);
}

.callout-tip {
  border-color: var(--adev-docs-success); /* Using success color for tips */
}
`],
})
export class CalloutComponent {
  type = input<CalloutType | undefined>();
  content = input<string | undefined>();

  get calloutClass(): string {
    return `callout-${this.type() || 'info'}`;
  }
}
