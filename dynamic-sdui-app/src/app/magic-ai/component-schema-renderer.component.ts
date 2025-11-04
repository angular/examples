/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentSchema } from './magic-ai-service';
import { APP_CONTEXT } from './app-context';

@Component({
  selector: 'component-schema-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngComponentOutlet="getComponentType(schema().name); inputs: schema().inputs" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentSchemaRenderer {
  private componentMap = APP_CONTEXT.componentMap;
  schema = input.required<DynamicComponentSchema>();

  getComponentType(name: string): Type<any> | null {
    return this.componentMap[name as keyof typeof this.componentMap] || null;
  }
}
