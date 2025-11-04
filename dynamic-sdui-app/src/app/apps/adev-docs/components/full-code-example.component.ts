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
  templateUrl: './full-code-example.component.html',
  styleUrl: './full-code-example.component.css',
})
export class FullCodeExampleComponent {
  example = input<FullCodeExample | undefined>();
}
