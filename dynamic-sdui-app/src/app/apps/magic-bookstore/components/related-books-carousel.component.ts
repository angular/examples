/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../data-store';
import { BookCoverCardComponent } from './book-cover-card.component';

@Component({
  selector: 'app-related-books-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, BookCoverCardComponent],
  templateUrl: './related-books-carousel.component.html',
  styleUrl: './related-books-carousel.component.css',
})
export class RelatedBooksCarouselComponent {
  books = input<Book[]>();
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  scroll(direction: 'left' | 'right') {
    const container = this.carouselContainer.nativeElement;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
