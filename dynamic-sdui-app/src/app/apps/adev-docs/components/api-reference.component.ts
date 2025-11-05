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

interface ApiParameter {
  name: string;
  type: string;
  description: string;
}

interface ApiReturnValue {
  type: string;
  description: string;
}

interface ApiItem {
  name: string;
  typeSignature?: string;
  description: string;
  parameters?: ApiParameter[];
  returnValue?: ApiReturnValue;
}

@Component({
  selector: 'adev-api-reference',
  standalone: true,
  imports: [CommonModule, FormatInlineCodePipe],
  template: `@if (apiItem(); as item) {
  <div class="api-reference-card">
    <h3 class="api-name">{{ item.name }}</h3>
    @if (item.typeSignature) {
      <pre class="api-signature"><code>{{ item.typeSignature }}</code></pre>
    }
    <p class="api-description" [innerHTML]="item.description | formatInlineCode"></p>

    @if (item.parameters && item.parameters.length > 0) {
      <div class="api-section">
        <h4>Parameters</h4>
        <ul class="api-params-list">
          @for (param of item.parameters; track param.name) {
            <li>
              <span class="param-name">{{ param.name }}</span>:
              <span class="param-type">{{ param.type }}</span> -
              <span class="param-description" [innerHTML]="param.description | formatInlineCode"></span>
            </li>
          }
        </ul>
      </div>
    }

    @if (item.returnValue) {
      <div class="api-section">
        <h4>Returns</h4>
        <p>
          <span class="return-type">{{ item.returnValue.type }}</span> -
          <span class="return-description" [innerHTML]="item.returnValue.description | formatInlineCode"></span>
        </p>
      </div>
    }
  </div>
}`,
  styles: [`.api-reference-card {
  background-color: var(--adev-docs-surface);
  border: 1px solid var(--adev-docs-border);
  border-radius: var(--adev-docs-border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--adev-docs-shadow);
  color: var(--adev-docs-text);
}

.api-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--adev-docs-primary);
  margin-bottom: 0.8rem;
}

.api-signature {
  background-color: var(--adev-docs-code-background);
  padding: 0.8rem;
  border-radius: var(--adev-docs-border-radius);
  overflow-x: auto;
  margin-bottom: 1rem;
}

.api-signature code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: var(--adev-docs-code-text);
  font-size: 0.95em;
}

.api-description {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  color: var(--adev-docs-text-secondary);
}

.api-section {
  margin-top: 1.5rem;
}

.api-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--adev-docs-text);
  margin-bottom: 0.8rem;
  border-bottom: 1px solid var(--adev-docs-border);
  padding-bottom: 0.3rem;
}

.api-params-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.api-params-list li {
  margin-bottom: 0.7rem;
  font-size: 0.95rem;
}

.param-name {
  font-weight: 600;
  color: var(--adev-docs-text);
}

.param-type {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: var(--adev-docs-primary);
}

.param-description {
  color: var(--adev-docs-text-secondary);
}

.return-type {
  font-weight: 600;
  color: var(--adev-docs-primary);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.return-description {
  color: var(--adev-docs-text-secondary);
}
`],
})
export class ApiReferenceComponent {
  apiItem = input<ApiItem | undefined>();
}
