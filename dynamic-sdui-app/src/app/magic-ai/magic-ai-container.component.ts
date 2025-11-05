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
  HostBinding,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { MagicAiRenderer } from './magic-ai-renderer.component';
import { MagicAiService } from './magic-ai.service';
import { APP_CONTEXT } from './app-context';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'magic-ai-component',
  imports: [CommonModule, MagicAiRenderer, MatProgressSpinnerModule, MatIconModule],
  standalone: true,
  styles: [`
    :host {
      display: block;
    }
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-4);
      color: var(--text-secondary);
      padding: var(--spacing-6);
      font-family: var(--font-family);
      background-color: var(--surface);
      border: var(--border-default);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-subtle);
    }
    .loading-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary);
    }
    .spinner-text-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
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
    :host ::ng-deep .mat-primary .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
    :host ::ng-deep .mat-primary .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
      stroke: var(--primary) !important;
    }
  `],
  template: `
    @if (isUiLoading()) {
      <div class="loading-container">
        <mat-icon class="loading-icon">auto_awesome</mat-icon>
        <div class="spinner-text-container">
          <mat-progress-spinner
          mode="indeterminate"
          diameter="32">
          </mat-progress-spinner>
          <p>{{loadingText()}}</p>
        </div>
      </div>
    } @else if (!!componentResource.error()) {
      <button (click)="componentResource.reload()">Reload</button>
      <p>Something went wrong.</p>
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
  loadingText = this.magicAiService.loadingText;
  isUiLoading = computed(() => !this.magicAiService.componentResource.value()?.componentSchema);
  theme = APP_CONTEXT.theme;
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

  @HostBinding('class') get themeClass() {
    return `${this.theme}-theme`;
  }
}

