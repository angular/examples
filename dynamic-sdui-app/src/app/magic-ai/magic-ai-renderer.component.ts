/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, input, computed, forwardRef, inject, HostBinding, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicElementSchema, DynamicComponentSchema, TextSchema, DynamicSchema } from './magic-ai-service';
import { ElementSchemaRenderer } from './element-schema-renderer.component';
import { ComponentSchemaRenderer } from './component-schema-renderer.component';
import { TextSchemaRenderer } from './text-schema-renderer.component';
import { MagicAiService } from './magic-ai-service';
import { APP_CONTEXT } from './app-context';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'magic-ai-renderer',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => ElementSchemaRenderer),
    ComponentSchemaRenderer,
    TextSchemaRenderer,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
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
    } @else {
      @switch (type()) {
        @case ('elementSchema') {
          <element-schema-renderer [schema]="elementSchema()" />
        }
        @case ('componentSchema') {
          <component-schema-renderer [schema]="componentSchema()" />
        }
        @case ('textSchema') {
          <text-schema-renderer [schema]="textSchema()" />
        }
        @default {
          <br/>
      }
    }
  }
  `,
  styles: [`
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
    :host ::ng-deep .mat-primary .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
    :host ::ng-deep .mat-primary .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
      stroke: var(--primary) !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicAiRenderer {
  magicAiService = inject(MagicAiService);
  schema = input.required<DynamicSchema>();
  type = computed(() => this.schema()?.type);
  elementSchema = computed(() => this.schema() as DynamicElementSchema);
  componentSchema = computed(() => this.schema() as DynamicComponentSchema);
  textSchema = computed(() => this.schema() as TextSchema);
  loadingText = this.magicAiService.loadingText;
  isUiLoading = computed(() => !this.magicAiService.componentResource.value()?.componentSchema);
  theme = APP_CONTEXT.theme;

  @HostBinding('class') get themeClass() {
    return `${this.theme}-theme`;
  }
}
