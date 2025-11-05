/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  template: `<div class="empty-state-container">
  <span class="icon material-icons">{{ icon() }}</span>
  <h2 class="title">{{ title() }}</h2>
  <p class="message">{{ message() }}</p>
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
}

.empty-state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--haven-spacing-6, 48px);
  border-radius: var(--haven-border-radius-lg, 12px);
  background-color: var(--haven-surface, #FFFFFF);
}

.icon {
  font-size: 64px;
  color: var(--haven-primary-light, #E6F2F2);
  margin-bottom: var(--haven-spacing-4, 24px);
}

.title {
  font-size: var(--haven-text-xl, 24px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0 0 var(--haven-spacing-2, 8px) 0;
}

.message {
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
  max-width: 450px; /* Constrain line length for readability */
}

.action-button {
  margin-top: var(--haven-spacing-4, 24px);
  padding: var(--haven-spacing-3, 16px) var(--haven-spacing-4, 24px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-surface, #FFFFFF);
  background-color: var(--haven-primary, #007A7A);
  border: none;
  border-radius: var(--haven-border-radius-md, 8px);
  cursor: pointer;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.action-button:hover {
  background-color: var(--haven-primary-dark, #005C5C);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  icon = input<string>();
  title = input<string>();
  message = input<string>();
  actionButtonText = input<string>();

  // In a real app, this would emit an event.
  performAction() {
    console.log('Action button clicked');
  }
}
