/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { RouterOutlet } from '@angular/router';
import { APP_CONTEXT } from '../magic-ai/app-context';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, ChatComponent, RouterOutlet],
  template: `<div class="ai-mode-scaffold" [ngClass]="theme + '-theme'">
<header class="app-header">
    <h1>{{appName}}</h1>
</header>
<main class="main-content">
    <div class="ai-content">
        <router-outlet />
    </div>
    <app-chat />
</main>
</div>`,
  styles: [`:host {
    display: block;
}

.toggle-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    background: var(--surface);
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-medium);
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-family: var(--font-family);
}

.toggle-container button {
    font-family: var(--font-family);
    font-size: var(--text-sm);
    padding: var(--spacing-1) var(--spacing-2);
    border: var(--border-default);
    border-radius: var(--border-radius-md);
    cursor: pointer;
}

.ai-mode-scaffold {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100dvh;
}

.app-header {
    background-color: var(--surface);
    padding: var(--spacing-3);
    border-bottom: var(--border-default);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.app-header h1 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--primary);
    margin: 0;
    text-align: center;
    flex-grow: 1;
}

.header-button {
    font-family: var(--font-family);
    font-size: var(--text-sm);
    padding: var(--spacing-1) var(--spacing-2);
    border: var(--border-default);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    background-color: var(--surface);
}

.main-content {
    display: grid;
    grid-template-columns: 3fr 1fr;
    overflow: hidden; /* Prevent scrolling on the grid container */
    min-height: 0;
}

.ai-content {
    overflow-y: auto; /* Allow scrolling on the AI content area */
    padding: var(--spacing-4);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Base {
  appName = APP_CONTEXT.appName;
  theme = APP_CONTEXT.theme;
}
