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
  templateUrl: './concept-explanation.component.html',
  styleUrl: './concept-explanation.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ConceptExplanationComponent {
  content = input<string | undefined>();
}