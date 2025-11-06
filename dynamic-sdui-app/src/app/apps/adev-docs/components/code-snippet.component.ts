/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import { MatIconModule } from '@angular/material/icon';
import { MagicAiService } from '../../../magic-ai/magic-ai.service';

@Component({
  selector: 'adev-code-snippet',
  standalone: true,
  imports: [CommonModule, Highlight, MatIconModule],
  template: `

@if (!code() || !language() || !this.magicAiService.isStreamComplete()) {
  <div class="code-snippet-container">
    <div class="placeholder-loading">
      <p>Loading...</p>
    </div>
  </div>
} @else {
  <div class="code-snippet-container">
    <pre><code [highlight]="code()!" [language]="language()!"></code></pre>
    <button class="copy-button" (click)="copyCode()">
      <mat-icon>content_copy</mat-icon>
    </button>
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
  margin: 10px 0;
}

.placeholder-loading {
  background-color: #282c34;
  min-height: 30px;
  color: #abb2bf;
  border: var(--adev-docs-border-default);
  border-radius: var(--adev-docs-border-radius-md);
  padding: 16px;
  font-family: var(--default-mono-font-family);
  margin: 10px 0;
}
`],
})
export class CodeSnippetComponent {
  magicAiService = inject(MagicAiService);
  code = input<string | undefined>();
  language = input<string | undefined>();

  copyCode() {
    if (this.code()) {
      navigator.clipboard.writeText(this.code()!);
    }
  }
}
