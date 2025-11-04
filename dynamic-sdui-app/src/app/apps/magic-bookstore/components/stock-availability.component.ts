/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-availability.component.html',
  styleUrl: './stock-availability.component.css',
})
export class StockAvailabilityComponent {
  stock = input<number>();
  price = input<number>();
  salePrice = input<number>();

  isInStock = computed(() => (this.stock() || 0) > 0);

  addToCart() {
    console.log('Add to cart clicked. Stock:', this.stock(), 'Price:', this.price(), 'Sale Price:', this.salePrice());
  }
}
