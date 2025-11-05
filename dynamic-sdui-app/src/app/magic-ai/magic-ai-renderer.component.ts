/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ElementRef,
  ViewRef,
  createComponent,
  EnvironmentInjector,
  ApplicationRef,
  input,
  untracked,
  inputBinding,
  Type,
} from '@angular/core';

import { DynamicSchema } from './magic-ai.service';
import { APP_CONTEXT } from './app-context';

/**
 * Renders a `DynamicSchema` of hierarchical components, elements, & text.
 */
@Component({
  selector: 'magic-ai-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class MagicAiRenderer {
  readonly schema = input.required<DynamicSchema>();
  private componentMap = APP_CONTEXT.componentMap;

  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  private readonly host = inject(ElementRef).nativeElement as HTMLElement;

  constructor() {
    // Effect that watches schema() and renders it.
    effect((onCleanup) => {
      const schema = this.schema();

      const views: ViewRef[] = [];
      // Actually render the schema to an element. We do this in untracked() to avoid accidental
      // reactive dependencies (even though there shouldn't be any).
      const node = untracked(() => this.render(schema, views));
      this.host.appendChild(node);

      onCleanup(() => {
        // When schema changes, remove the old node and destroy all associated views.
        node.remove();
        for (const view of views) {
          view.destroy();
        }
      });
    });
  }

  private render(schema: DynamicSchema, views: ViewRef[]): ChildNode {
    if (!schema) {
      return document.createElement('br');
    }

    switch (schema.type) {
      case 'componentSchema': {
        // Dynamically instantiate the component.
        const component = this.getComponentType(schema.name);
        if (component) {
          const cmp = createComponent(component, {
            environmentInjector: this.injector,
            // Bind any inputs requested.
            bindings: Object.keys(schema.inputs ?? {}).map((key) =>
              inputBinding(key, () => schema.inputs![key])
            ),
          });
  
          // Attach to change detection and save the view for later cleanup.
          this.appRef.attachView(cmp.hostView);
          views.push(cmp.hostView);
  
          // Hack to remove ng-version attribute which gets added to AppRef level views automatically.
          cmp.location.nativeElement.removeAttribute('ng-version');
          return cmp.location.nativeElement;
        }
        return document.createElement('br');
      }
      case 'elementSchema': {
        if (!schema.element || schema.element === '') {
          return document.createElement('br');
        }

        // Render an element dynamically.
        const element = document.createElement(schema.element);

        // Set any attributes requested.
        for (const key of Object.keys(schema.attributes ?? {})) {
          element.setAttribute(key, schema.attributes![key]);
        }

        if (schema.children) {
          // Render & append children.
          element.append(
            ...schema.children.map((child) => this.render(child, views))
          );
        }
        return element;
      }
      case 'textSchema': {
        return document.createTextNode(schema.text);
      }
      default:
        return document.createElement('br');
    }
  }

  private getComponentType(name: string): Type<any> | null {
    return this.componentMap[name as keyof typeof this.componentMap] || null;
  }
}
