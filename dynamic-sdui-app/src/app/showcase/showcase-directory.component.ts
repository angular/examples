/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-showcase-directory',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="showcase-directory-container">
      <h1>Component Showcases</h1>
      <ul>
        <li><a routerLink="/showcase/adev-docs">Angular Docs Showcase</a></li>
        <li><a routerLink="/showcase/haven">Vacation Rentals Showcase</a></li>
        <li><a routerLink="/showcase/magic-bookstore">Magic Bookstore Showcase</a></li>
      </ul>
    </div>
  `,
  styles: [`
    .showcase-directory-container {
      padding: 2rem;
      background-color: var(--background);
      color: var(--text-primary);
      font-family: var(--font-family);
    }
    h1 {
      font-size: var(--text-xxl);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-4);
      color: var(--primary);
    }
    ul {
      padding-left: 40px;
    }
    li {
      margin-bottom: var(--spacing-2);
    }
    a {
      color: var(--primary);
      text-decoration: none;
      font-size: var(--text-lg);
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class ShowcaseDirectoryComponent {}
