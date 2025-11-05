/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RatingStarsComponent],
  template: `<div class="property-card" (click)="viewDetail()">
    @if (imgUrl()) {
    <div class="image-wrapper">
      <img [src]="imgUrl()" [alt]="title()" priority fill class="property-image">
    </div>
  }
  <div class="card-content">
    @if (location()) {
      <h3 class="location">{{ location() }}</h3>
    }
    @if (rating() && reviewCount()) {
      <app-rating-stars [rating]="rating()" [reviewCount]="reviewCount()" />
    }
    @if (title()) {
      <p class="title">{{ title() }}</p>
    }
    @if (pricePerNight()) {
      <p class="price">
        <strong>\${{ pricePerNight() }}</strong> night
      </p>
    }
  </div>
</div>`,
  styles: [`
:host {
  display: flex;
  font-family: var(--haven-font-family, sans-serif);
  cursor: pointer;
  max-width: 400px;
}

.property-card {
  padding: 20px;
}

.image-wrapper {
  position: relative;
  width: 300px;
  aspect-ratio: 1 / 1;
  overflow: cover;
  border-radius: var(--haven-border-radius-lg, 12px);
  margin-bottom: var(--haven-spacing-3, 16px);
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
  border-radius: var(--haven-border-radius-lg, 12px);
}

:host(:hover) .property-image {
  transform: scale(1.05);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-1, 4px); /* Tighter spacing for text content */
}

.location {
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0;
  /* Truncate long location strings */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
  margin-top: var(--haven-spacing-1, 4px);
}

.price strong {
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardComponent {
  chatService = inject(ChatService);
  imageUrls = input<string[]>([]);
  location = input<string>();
  title = input<string>();
  pricePerNight = input<number>();
  rating = input<number>();
  reviewCount = input<number>();
  imgUrl = computed(() => {
    if (this.imageUrls() && this.imageUrls()!.length > 0) {
      return this.imageUrls()![0];
    } else {
      return '';
    }
  })

  viewDetail(): void {
    this.chatService.addUserPrompt(`Show me detail for the ${this.title()} listing`);
  }
}
