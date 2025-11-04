/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Author } from '../data-store';

@Component({
  selector: 'app-author-bio-card',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './author-bio-card.component.html',
  styleUrl: './author-bio-card.component.css',
})
export class AuthorBioCardComponent {
  author = input<Author>();
}
