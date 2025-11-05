/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Define the type for the host input right here for clarity and type safety.
export type Host = {
  name: string;
  avatarUrl: string;
  joinDate: string;
  isSuperhost: boolean;
};

@Component({
  selector: 'app-host-profile-card',
  standalone: true,
  imports: [],
  template: `@if (host(); as hostData) {
  <div class="host-card">
    <img [src]="hostData.avatarUrl" [alt]="hostData.name" class="avatar" width="64" height="64">
    <div class="host-info">
      <h4 class="host-name">Hosted by {{ hostData.name }}</h4>
      <p class="join-date">Joined in {{ hostData.joinDate }}</p>
    </div>
    @if (hostData.isSuperhost) {
      <div class="superhost-badge">
        <span class="material-icons">workspace_premium</span>
        <span>Superhost</span>
      </div>
    }
  </div>
}`,
  styles: [`
:host {
  display: block;
  min-width: 405px;;
}

.host-card {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-3, 16px);
  font-family: var(--haven-font-family, sans-serif);
  padding: var(--haven-spacing-4, 24px);
  background-color: var(--haven-surface, #FFFFFF);
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-lg, 12px);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0; /* Prevents the avatar from shrinking if the text content is long */
}

.host-info {
  flex-grow: 1; /* Allows the info section to take up the remaining space */
}

.host-name {
  font-size: var(--haven-text-lg, 18px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0;
}

.join-date {
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-secondary, #555555);
  margin: var(--haven-spacing-1, 4px) 0 0 0;
}

.superhost-badge {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-2, 8px);
  color: var(--haven-accent-gold, #FFB400);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  flex-shrink: 0;
}

.superhost-badge .material-icons {
  font-size: 20px;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostProfileCardComponent {
  host = input<Host>();
}
