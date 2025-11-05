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
  template: `<div class="stock-availability-panel">
  <div class="price-info">
    @if (salePrice()) {
      <span class="original-price">{{ price() | currency:'USD':'symbol':'1.2-2' }}</span>
      <span class="sale-price">{{ salePrice() | currency:'USD':'symbol':'1.2-2' }}</span>
    } @else {
      <span class="current-price">{{ price() | currency:'USD':'symbol':'1.2-2' }}</span>
    }
  </div>

  <div class="stock-info">
    @if (isInStock()) {
      <span class="in-stock">In Stock ({{ stock() }} available)</span>
    } @else {
      <span class="out-of-stock">Out of Stock</span>
    }
  </div>

  <button class="add-to-cart-button" [disabled]="!isInStock()" (click)="addToCart()">
    Add to Cart
  </button>
</div>`,
  styles: [`.stock-availability-panel {
  background-color: var(--surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-subtle);
  padding: var(--spacing-5);
  border: var(--border-default);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  align-items: flex-start;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
}

.current-price {
  font-size: var(--text-xxl);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}

.original-price {
  font-size: var(--text-lg);
  color: var(--text-muted);
  text-decoration: line-through;
}

.sale-price {
  font-size: var(--text-xxl);
  font-weight: var(--font-weight-semibold);
  color: var(--error);
}

.stock-info {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
}

.in-stock {
  color: var(--success);
}

.out-of-stock {
  color: var(--error);
}

.add-to-cart-button {
  background-color: var(--primary);
  color: var(--surface);
  padding: var(--spacing-3) var(--spacing-5);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-default);
  box-shadow: var(--shadow-subtle);
}

.add-to-cart-button:hover:not(:disabled) {
  background-color: var(--primary-dark);
  box-shadow: var(--shadow-medium);
}

.add-to-cart-button:active:not(:disabled) {
  transform: translateY(1px);
}

.add-to-cart-button:disabled {
  background-color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}
`],
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
