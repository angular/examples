/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from './code-snippet.component'; // Re-use the code snippet styling
import { FormatInlineCodePipe } from '../../../pipes/format-inline-code.pipe';

interface FullCodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
}

@Component({
  selector: 'adev-full-code-example',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent, FormatInlineCodePipe],
  template: `@if (example(); as ex) {
  <div class="full-code-example-card">
    @if (ex.title) {
      <h3 class="example-title" [innerHTML]="ex.title | formatInlineCode"></h3>
    }
    @if (ex.description) {
      <p class="example-description" [innerHTML]="ex.description | formatInlineCode"></p>
    }
    <adev-code-snippet [code]="ex.code" [language]="ex.language"></adev-code-snippet>
  </div>
}`,
  styles: [`.full-code-example-card {
  position: relative;
  background-color: var(--adev-docs-surface);
  border: 1px solid var(--adev-docs-border);
  border-radius: var(--adev-docs-border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--adev-docs-shadow);
  color: var(--adev-docs-text);
}

.example-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--adev-docs-primary);
  margin-bottom: 0.8rem;
}

.example-description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  color: var(--adev-docs-text-secondary);
}

/* CodeSnippetComponent styles are inherited/used via the component itself */
`],
})
export class FullCodeExampleComponent {
  example = input<FullCodeExample | undefined>();
}
