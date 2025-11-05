/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'adev-concept-explanation',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  template: `@if (content()) {
  <markdown [data]="content()"></markdown>
}`,
  styles: [`.concept-explanation {
  color: var(--adev-docs-text);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.concept-explanation :is(h1, h2, h3, h4, h5, h6) {
  color: var(--adev-docs-text);
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.concept-explanation h1 { font-size: 2em; }
.concept-explanation h2 { font-size: 1.75em; }
.concept-explanation h3 { font-size: 1.5em; }
.concept-explanation h4 { font-size: 1.25em; }
.concept-explanation h5 { font-size: 1.1em; }
.concept-explanation h6 { font-size: 1em; }

.concept-explanation p {
  margin-bottom: 1em;
}



.concept-explanation a {
  color: var(--adev-docs-primary);
  text-decoration: none;
}

.concept-explanation a:hover {
  text-decoration: underline;
}

.concept-explanation code {
  background-color: var(--adev-docs-code-background);
  color: var(--adev-docs-code-text);
  padding: 0.2em 0.4em;
  border-radius: var(--adev-docs-border-radius);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
}

.concept-explanation pre {
  background-color: var(--adev-docs-code-background);
  color: var(--adev-docs-code-text);
  padding: 1em;
  border-radius: var(--adev-docs-border-radius);
  overflow-x: auto;
  margin-bottom: 1em;
}

.concept-explanation pre code {
  padding: 0;
  font-size: 1em;
}
`],
  encapsulation: ViewEncapsulation.None,
})
export class ConceptExplanationComponent {
  content = input<string | undefined>();
}