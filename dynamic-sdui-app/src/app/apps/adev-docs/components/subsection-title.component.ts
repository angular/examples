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
  selector: 'adev-subsection-title',
  standalone: true,
  imports: [CommonModule, FormatInlineCodePipe],
  template: `@if (title()) {
  <h3 class="subsection-title" [innerHTML]="title() | formatInlineCode"></h3>
}`,
  styles: [`.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--adev-docs-text);
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px dashed var(--adev-docs-border);
}
`],
})
export class SubsectionTitleComponent {
  title = input<string | undefined>();
}
