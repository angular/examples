/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RatingStarsComponent],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
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
