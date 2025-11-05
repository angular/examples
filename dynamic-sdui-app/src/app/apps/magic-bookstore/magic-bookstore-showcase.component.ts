/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Book, DATA } from './data-store';

// Import all generated components
import { BookCoverCardComponent } from './components/book-cover-card.component';
import { BookDetailHeroComponent } from './components/book-detail-hero.component';
import { AuthorBioCardComponent } from './components/author-bio-card.component';
import { ReviewSummaryComponent } from './components/review-summary.component';
import { FullReviewCardComponent } from './components/full-review-card.component';
import { GenreTagCloudComponent } from './components/genre-tag-cloud.component';
import { BookSpecificationsComponent } from './components/book-specifications.component';
import { AwardBadgeComponent } from './components/award-badge.component';
import { BestsellerRibbonComponent } from './components/bestseller-ribbon.component';
import { SeriesInfoCardComponent } from './components/series-info-card.component';
import { BookDescriptionPanelComponent } from './components/book-description-panel.component';
import { StockAvailabilityComponent } from './components/stock-availability.component';
import { RelatedBooksCarouselComponent } from './components/related-books-carousel.component';

@Component({
  selector: 'app-magic-bookstore-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BookCoverCardComponent,
    BookDetailHeroComponent,
    AuthorBioCardComponent,
    ReviewSummaryComponent,
    FullReviewCardComponent,
    GenreTagCloudComponent,
    BookSpecificationsComponent,
    AwardBadgeComponent,
    BestsellerRibbonComponent,
    SeriesInfoCardComponent,
    BookDescriptionPanelComponent,
    StockAvailabilityComponent,
    RelatedBooksCarouselComponent,
  ],
  template: `
    <div class="showcase-container">
      <h1>Magic Bookstore Component Showcase</h1>

      <h2>Book Cover Card Component</h2>
      <div class="component-section grid-cols-3">
        @for (book of sampleBooks; track book.id) {
          <app-book-cover-card [book]="book"></app-book-cover-card>
        }
      </div>

      <h2>Book Detail Hero Component</h2>
      <div class="component-section">
        <app-book-detail-hero [book]="sampleBookDetail"></app-book-detail-hero>
      </div>

      <h2>Author Bio Card Component</h2>
      <div class="component-section grid-cols-2">
        @for (author of sampleBookDetail.authors; track author.name) {
          <app-author-bio-card [author]="author"></app-author-bio-card>
        }
      </div>

      <h2>Review Summary Component</h2>
      <div class="component-section">
        <app-review-summary [averageRating]="sampleBookDetail.averageRating" [reviewCount]="sampleBookDetail.reviews.length"></app-review-summary>
      </div>

      <h2>Full Review Card Component</h2>
      <div class="component-section grid-cols-2">
        @for (review of sampleBookDetail.reviews; track review.username) {
          <app-full-review-card [review]="review"></app-full-review-card>
        }
      </div>

      <h2>Genre Tag Cloud Component</h2>
      <div class="component-section">
        <app-genre-tag-cloud [genres]="sampleBookDetail.genres" [tags]="sampleBookDetail.tags"></app-genre-tag-cloud>
      </div>

      <h2>Book Specifications Component</h2>
      <div class="component-section">
        <app-book-specifications [book]="sampleBookDetail"></app-book-specifications>
      </div>

      <h2>Award Badge Component</h2>
      <div class="component-section flex-row">
        @if (sampleBookDetail.awards) {
          @for (award of sampleBookDetail.awards; track award.name) {
            <app-award-badge [award]="award"></app-award-badge>
          }
        }
      </div>

      <h2>Bestseller Ribbon Component</h2>
      <div class="component-section">
        <div style="position: relative; width: 200px; height: 300px; border: 1px solid var(--border); display: flex; justify-content: center; align-items: center;">
          <app-bestseller-ribbon [rank]="sampleBookDetail.bestsellerRank"></app-bestseller-ribbon>
          <span>(Placeholder for book cover)</span>
        </div>
      </div>

      <h2>Series Info Card Component</h2>
      <div class="component-section">
        @if (sampleBookDetail.series) {
          <app-series-info-card [series]="sampleBookDetail.series"></app-series-info-card>
        }
      </div>

      <h2>Book Description Panel Component</h2>
      <div class="component-section">
        <app-book-description-panel [description]="sampleBookDetail.description"></app-book-description-panel>
      </div>

      <h2>Stock Availability Component</h2>
      <div class="component-section">
        <app-stock-availability [stock]="sampleBookDetail.stock" [price]="sampleBookDetail.price" [salePrice]="sampleBookDetail.salePrice"></app-stock-availability>
      </div>

      <h2>Related Books Carousel Component</h2>
      <div class="component-section">
        <app-related-books-carousel [books]="sampleBooks"></app-related-books-carousel>
      </div>
    </div>
  `,
  styles: [`
    .showcase-container {
      padding: var(--spacing-6);
      font-family: var(--font-family);
      color: var(--text-primary);
      background-color: var(--background);
    }

    h1 {
      font-size: var(--text-xxl);
      font-weight: var(--font-weight-semibold);
      color: var(--primary);
      margin-bottom: var(--spacing-5);
      border-bottom: var(--border-default);
      padding-bottom: var(--spacing-3);
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
      margin-top: var(--spacing-6);
      margin-bottom: var(--spacing-4);
      border-bottom: 1px dashed var(--border);
      padding-bottom: var(--spacing-2);
    }

    .component-section {
      background-color: var(--surface);
      border: var(--border-default);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-5);
      margin-bottom: var(--spacing-5);
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-4);
    }

    .component-section.grid-cols-3 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--spacing-4);
    }

    .component-section.grid-cols-2 {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--spacing-4);
    }

    .component-section.flex-row {
      flex-direction: row;
      align-items: center;
    }
  `]
})
export class MagicBookstoreShowcaseComponent {
  sampleBooks: Book[] = DATA.slice(0, 3);
  sampleBookDetail: Book = DATA[0];
}
