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
  templateUrl: './callout.component.html',
  styleUrl: './callout.component.css',
})
export class CalloutComponent {
  type = input<CalloutType | undefined>();
  content = input<string | undefined>();

  get calloutClass(): string {
    return `callout-${this.type() || 'info'}`;
  }
}
