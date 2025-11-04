/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TextSchema } from './magic-ai-service';

@Component({
  selector: 'text-schema-renderer',
  standalone: true,
  template: `{{schema().text}}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSchemaRenderer {
  schema = input.required<TextSchema>();
}
