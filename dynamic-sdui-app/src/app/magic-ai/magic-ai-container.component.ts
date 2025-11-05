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
  computed,
  input,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { MagicAiRenderer } from './magic-ai-renderer.component';
import { MagicAiService } from './magic-ai.service';

@Component({
  selector: 'magic-ai-component',
  imports: [CommonModule, MagicAiRenderer],
  standalone: true,
  styles: [`
    :host {
      display: block;
    }
    button {
      margin-bottom: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-3);
      border: none;
      background-color: var(--primary);
      color: white;
      border-radius: var(--border-radius-md);
      cursor: pointer;
      font-family: var(--font-family);
      transition: var(--transition-default);
    }
    button:hover {
        background-color: var(--primary-dark);
    }
  `],
  template: `
    @if (!!componentResource.error()) {
      <button (click)="componentResource.reload()">Reload</button>
      <p>Something went wrong.</p>
    } @else if (componentResource.isLoading()) {
      <p>Loading...</p>
    } @else if (componentResource.hasValue()) {
      <magic-ai-renderer [schema]="activeSchema()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicAiComponent {
  private router = inject(Router);
  private readonly magicAiService = inject(MagicAiService);
  componentResource = this.magicAiService.componentResource;
  index = input.required<string>();
  schemaIndex = computed(() => parseInt(this.index()));
  activeSchema = computed(() => {
    if (this.schemaIndex() >= 0 && this.schemaIndex() < this.magicAiService.componentSchemaList().length) {
      return this.magicAiService.componentSchemaList()[this.schemaIndex()];
    } else {
      return this.componentResource.value()?.componentSchema;
    }
  });

  constructor() {
    effect(() => {
      try {
        const schemaLen = this.magicAiService.componentSchemaList().length - 1;
        const index = parseInt(this.index());
        if (index > schemaLen + 1 || index < 0) {
          const adjustedIndex = Math.max(schemaLen - 1, 0);
          this.router.navigate([`/magic/${adjustedIndex}`]);
        }
      } catch (e) {
        console.log('MagicAi Component: componentResource error');
      }
    });
  }
}

