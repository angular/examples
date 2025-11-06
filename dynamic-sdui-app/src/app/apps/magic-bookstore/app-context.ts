/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Type } from '@angular/core';
import { AppContext, ComponentContext } from '../../magic-ai/app-context';
import { BookCoverCardComponent } from './components/book-cover-card.component';
import { BookDetailHeroComponent } from './components/book-detail-hero.component';
import { AuthorBioCardComponent } from './components/author-bio-card.component';
import { ReviewSummaryComponent } from './components/review-summary.component';
import { FullReviewCardComponent } from './components/full-review-card.component';
import { GenreTagCloudComponent } from './components/genre-tag-cloud.component';
import { BookSpecificationsComponent } from './components/book-specifications.component';
import { AwardBadgeComponent } from './components/award-badge.component';
import { SeriesInfoCardComponent } from './components/series-info-card.component';
import { BookDescriptionPanelComponent } from './components/book-description-panel.component';
import { StockAvailabilityComponent } from './components/stock-availability.component';
import { RelatedBooksCarouselComponent } from './components/related-books-carousel.component';

const GENERATED_COMPONENT_CONTEXT_DATA: ComponentContext[] = [
  {
    name: 'BookCoverCardComponent',
    description: "Displays a book's cover, title, author, and price in a compact card format. Ideal for lists and search results.",
    type: 'dynamicComponent',
    inputs: {
      book: { type: 'Book', description: "The book object to display.", required: true },
    },
  },
  {
    name: 'BookDetailHeroComponent',
    description: "Presents the main details of a book in a prominent hero section.",
    type: 'dynamicComponent',
    inputs: {
      book: { type: 'Book', description: "The book object to display in detail.", required: true },
    },
  },
  {
    name: 'AuthorBioCardComponent',
    description: "Displays an author's name, image, and a brief biography.",
    type: 'dynamicComponent',
    inputs: {
      author: { type: 'Author', description: "The author object to display.", required: true },
    },
  },
  {
    name: 'ReviewSummaryComponent',
    description: "Shows the average star rating and the total number of reviews for a book.",
    type: 'dynamicComponent',
    inputs: {
      averageRating: { type: 'number', description: "The average rating of the book (1-5).", required: true },
      reviewCount: { type: 'number', description: "The total number of reviews.", required: true },
    },
  },
  {
    name: 'FullReviewCardComponent',
    description: "Displays a single, detailed customer review for a book.",
    type: 'dynamicComponent',
    inputs: {
      review: { type: 'Review', description: "The review object to display.", required: true },
    },
  },
  {
    name: 'GenreTagCloudComponent',
    description: "Displays a collection of genres and tags associated with a book as interactive, visually distinct chips.",
    type: 'dynamicComponent',
    inputs: {
      genres: { type: 'string[]', description: "An array of genre strings.", required: false },
      tags: { type: 'string[]', description: "An array of tag strings.", required: false },
    },
  },
  {
    name: 'BookSpecificationsComponent',
    description: "Presents detailed physical and publication specifications of a book.",
    type: 'dynamicComponent',
    inputs: {
      book: { type: 'Book', description: "The book object containing specifications.", required: true },
    },
  },
  {
    name: 'AwardBadgeComponent',
    description: "Displays a single award received by a book.",
    type: 'dynamicComponent',
    inputs: {
      award: { type: 'Award', description: "The award object to display.", required: true },
    },
  },
  {
    name: 'SeriesInfoCardComponent',
    description: "Displays information about the book's series.",
    type: 'dynamicComponent',
    inputs: {
      series: { type: '{ name: string; number: number; }', description: "An object containing the series name and book number.", required: true },
    },
  },
  {
    name: 'BookDescriptionPanelComponent',
    description: "Displays the full description of a book, with an option to expand/collapse for longer texts.",
    type: 'dynamicComponent',
    inputs: {
      description: { type: 'string', description: "The full description of the book.", required: true },
    },
  },
  {
    name: 'StockAvailabilityComponent',
    description: "Displays the current stock status of a book and provides an \"Add to Cart\" button.",
    type: 'dynamicComponent',
    inputs: {
      stock: { type: 'number', description: "The current stock quantity of the book.", required: true },
      price: { type: 'number', description: "The regular price of the book.", required: true },
      salePrice: { type: 'number', description: "Optional sale price of the book.", required: false },
    },
  },
  {
    name: 'RelatedBooksCarouselComponent',
    description: "Displays a horizontal, scrollable carousel of related book cards.",
    type: 'dynamicComponent',
    inputs: {
      books: { type: 'Book[]', description: "An array of related book objects to display.", required: true },
    },
  },
];

const GENERATED_COMPONENT_MAP: { [key: string]: Type<any> } = {
  BookCoverCardComponent: BookCoverCardComponent,
  BookDetailHeroComponent: BookDetailHeroComponent,
  AuthorBioCardComponent: AuthorBioCardComponent,
  ReviewSummaryComponent: ReviewSummaryComponent,
  FullReviewCardComponent: FullReviewCardComponent,
  GenreTagCloudComponent: GenreTagCloudComponent,
  BookSpecificationsComponent: BookSpecificationsComponent,
  AwardBadgeComponent: AwardBadgeComponent,
  SeriesInfoCardComponent: SeriesInfoCardComponent,
  BookDescriptionPanelComponent: BookDescriptionPanelComponent,
  StockAvailabilityComponent: StockAvailabilityComponent,
  RelatedBooksCarouselComponent: RelatedBooksCarouselComponent,
};

const GENERATED_APP_DESCRIPTION = `
You are building a UI for a Magic Bookstore application. Your primary goal is to create a seamless and user-friendly experience for discovering, learning about, and purchasing books.

### 1. Domain-Specific Mapping Rules:

*   When displaying a book in a list or search result, you must use the 
BookCoverCardComponent
.
*   When displaying detailed information about a single book, you must use the 
BookDetailHeroComponent
 at the top of the page, followed by 
BookDescriptionPanelComponent
, 
BookSpecificationsComponent
, 
AuthorBioCardComponent
 (for each author), 
ReviewSummaryComponent
, and 
FullReviewCardComponent
 (for each review).
*   When displaying a list of authors, use 
AuthorBioCardComponent
 for each author.
*   When displaying genres or tags, use the 
GenreTagCloudComponent
.
*   When a book has an 
averageRating
 and 
reviews
, use 
ReviewSummaryComponent
 and 
FullReviewCardComponent
 for individual reviews.
*   When a book has 
awards
, use 
AwardBadgeComponent
 for each award.
*   When a book has a 
bestsellerRank
, use 
BestsellerRibbonComponent
.
*   When a book is part of a 
series
, use 
SeriesInfoCardComponent
.
*   When displaying stock information and purchase options, use 
StockAvailabilityComponent
.
*   When suggesting other books, use 
RelatedBooksCarouselComponent
.

### 2. Layout Compositions:

*   **DefaultBookLayout**: For a book detail page, render a vertical stack starting with 
BookDetailHeroComponent
, followed by 
BookDescriptionPanelComponent
, 
BookSpecificationsComponent
, a section for authors (each 
AuthorBioCardComponent
), a section for reviews (first 
ReviewSummaryComponent
, then a list of 
FullReviewCardComponent
's), and finally 
RelatedBooksCarouselComponent
.
*   **BookListLayout**: For displaying multiple books (e.g., search results, genre lists), render a responsive grid of 
BookCoverCardComponent
's.
*   **AuthorProfileLayout**: For an author's dedicated profile page, render 
AuthorBioCardComponent
 at the top, followed by a list of 
BookCoverCardComponent
's for their works.
`;

const LOADING_TEXT: string[] = [
  "Summoning ancient texts...",
  "Brewing a potion of prose...",
  "Consulting the Oracle of Pages...",
  "Polishing the crystal ball of chapters...",
  "Whispering to the library spirits...",
  "Unfurling the scroll of destiny...",
  "Aligning the literary constellations...",
  "Stirring the cauldron of narratives...",
  "Decoding forgotten manuscripts...",
  "Conjuring captivating chronicles...",
  "Weaving tales from stardust...",
  "Illuminating the path to your next read...",
  "Gathering wisdom from the elder scrolls...",
  "Infusing magic into every word...",
  "Preparing your personalized literary journey...",
  "Opening the portal to new worlds...",
  "Arranging the symphony of stories...",
  "Channeling the muse of masterpieces...",
  "Crafting your bespoke bibliography...",
  "Invoking the spirits of great authors...",
  "Shaping narratives from the ether...",
  "Unlocking the secrets of the written word...",
  "Manifesting your literary desires...",
  "Drawing inspiration from the cosmic library...",
  "Setting the stage for your reading adventure...",
  "Igniting the spark of imagination...",
  "Composing a concerto of content...",
  "Curating your next unforgettable experience...",
  "Bending reality to bring you books...",
  "Enchanting your reading list...",
  "Preparing a feast for your mind...",
  "Assembling the perfect collection...",
  "Bringing stories to life...",
  "Where every page is a new discovery...",
  "The magic of reading, reimagined...",
  "Your literary journey starts here...",
  "Dive into a world of words...",
  "Explore endless stories...",
  "The future of reading is now...",
];

export const GENERATED_APP_CONTEXT: AppContext = {
  appName: 'Magic Bookstore',
  theme: 'magic-bookstore',
  welcomeText: 'Welcome to Magic Bookstore! Your next great read is just a spellbinding search away.',
  placeholders: LOADING_TEXT,
  appDescription: GENERATED_APP_DESCRIPTION,
  componentMap: GENERATED_COMPONENT_MAP,
  componentContextData: GENERATED_COMPONENT_CONTEXT_DATA
};
