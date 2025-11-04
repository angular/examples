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
  templateUrl: './subsection-title.component.html',
  styleUrl: './subsection-title.component.css',
})
export class SubsectionTitleComponent {
  title = input<string | undefined>();
}
