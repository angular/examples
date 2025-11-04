/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'adev-code-snippet',
  standalone: true,
  imports: [CommonModule, Highlight, MatIconModule, MatProgressBarModule],
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.css',
})
export class CodeSnippetComponent {
  code = input<string | undefined>();
  language = input<string | undefined>();

  copyCode() {
    if (this.code()) {
      navigator.clipboard.writeText(this.code()!);
    }
  }
}
