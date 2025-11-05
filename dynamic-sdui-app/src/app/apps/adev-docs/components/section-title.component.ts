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

@Component({
  selector: 'adev-section-title',
  standalone: true,
  imports: [CommonModule, FormatInlineCodePipe],
  template: `@if (title()) {
  <h2 class="section-title" [innerHTML]="title() | formatInlineCode"></h2>
}`,
  styles: [`.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--adev-docs-text);
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--adev-docs-border);
}
`],
})
export class SectionTitleComponent {
  title = input<string | undefined>();
}
