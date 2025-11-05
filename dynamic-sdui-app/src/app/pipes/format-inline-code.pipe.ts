/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInlineCode',
  standalone: true,
})
export class FormatInlineCodePipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    // This regex finds all instances of text wrapped in backticks and replaces them with <code>...</code>
    return value.replace(/`([^`]+)`/g, '<code>$1</code>');
  }
}
