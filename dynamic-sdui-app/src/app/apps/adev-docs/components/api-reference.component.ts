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
  templateUrl: './api-reference.component.html',
  styleUrl: './api-reference.component.css',
})
export class ApiReferenceComponent {
  apiItem = input<ApiItem | undefined>();
}
