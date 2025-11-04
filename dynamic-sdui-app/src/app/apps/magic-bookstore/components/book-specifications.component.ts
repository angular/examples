/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../data-store';

@Component({
  selector: 'app-book-specifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-specifications.component.html',
  styleUrl: './book-specifications.component.css',
})
export class BookSpecificationsComponent {
  book = input<Book>();
}
