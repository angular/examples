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
  template: `@if (code() && language()) {
  <div class="code-snippet-container">
    <pre><code [highlight]="code()!" [language]="language()!"></code></pre>
    <button class="copy-button" (click)="copyCode()">
      <mat-icon>content_copy</mat-icon>
    </button>
  </div>
} @else {
  <div class="code-snippet-container">
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </div>
}`,
  styles: [`.code-snippet-container {
  position: relative;
}

.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  color: var(--adev-docs-text-secondary);
  cursor: pointer;
}

.copy-button:hover {
  color: var(--adev-docs-text-primary);
}

.code-snippet {
  background-color: var(--adev-docs-code-background);
  padding: 1em;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
  line-height: 1.4;
}

.code-snippet code {
  color: var(--adev-docs-code-text);
}

code {
  border: var(--adev-docs-border-default);
  border-radius: var(--adev-docs-border-radius-md);
}
`],
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
