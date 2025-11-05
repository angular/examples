/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AlertStatus = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [],
  template: `<span class="icon material-icons">{{ iconName }}</span>
<p class="message">{{ message() }}</p>
@if (isDismissible()) {
  <button class="close-button" (click)="dismiss()">
    <span class="material-icons">close</span>
  </button>
}`,
  styles: [`
/*
  RATIONALE: Alert banners must be highly visible and immediately convey the nature
  of the message (success, error, etc.) through color and iconography.
*/
:host {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-3, 16px);
  padding: var(--haven-spacing-3, 16px);
  border-radius: var(--haven-border-radius-md, 8px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-surface, #FFFFFF);
  margin-bottom: var(--haven-spacing-4, 24px); /* Provide space from content below */
}

.icon {
  font-size: 24px;
  flex-shrink: 0;
}

.message {
  margin: 0;
  flex-grow: 1;
}

.close-button {
  background: none;
  border: none;
  color: inherit; /* Inherits the white text color from the host */
  padding: var(--haven-spacing-1, 4px);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.close-button:hover {
  opacity: 1;
  background-color: rgba(0,0,0,0.1);
}

:host(.success) {
  background-color: var(--haven-success, #28a745);
}
:host(.warning) {
  background-color: var(--haven-warning, #ffc107);
  color: var(--haven-text-primary, #222222); /* Use dark text on yellow for contrast */
}
:host(.error) {
  background-color: var(--haven-error, #dc3545);
}
:host(.info) {
  background-color: var(--haven-primary, #007A7A);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'status()',
    '[attr.role]': '"alert"'
  },
})
export class AlertBannerComponent {
  message = input<string>();
  status = input<AlertStatus>("success");
  isDismissible = input<boolean>(false);

  get iconName(): string {
    switch (this.status()) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
    }
  }

  // In a real app, this would emit an event to self-destruct.
  dismiss() {
    console.log('Dismissing alert');
  }
}
