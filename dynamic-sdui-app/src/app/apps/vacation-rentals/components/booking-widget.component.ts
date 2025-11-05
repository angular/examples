/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-widget',
  standalone: true,
  imports: [RatingStarsComponent, FormsModule],
  template: `<div class="widget-container">
  <div class="widget-header">
    <p class="price"><strong>\${{ pricePerNight() }}</strong> night</p>
    <app-rating-stars [rating]="rating()" [reviewCount]="reviewCount()" />
  </div>

  <div class="widget-body">
    <div class="date-picker">
      <div class="date-input">
        <label for="checkin">CHECK-IN</label>
        <input type="date" id="checkin" [value]="checkInDateString()" (change)="onCheckInChange($event)">
      </div>
      <div class="date-input">
        <label for="checkout">CHECKOUT</label>
        <input type="date" id="checkout" [value]="checkOutDateString()" (change)="onCheckOutChange($event)">
      </div>
    </div>
    <div class="guest-selector">
      <label for="guests">GUESTS</label>
      <select id="guests" [value]="guestCount()" (change)="onGuestsChange($event)">
        @for (i of [].constructor(maxGuests()); track $index) {
          <option [value]="$index + 1">{{ $index + 1 }} guest{{ $index > 0 ? 's' : '' }}</option>
        }
      </select>
    </div>
  </div>

  <button class="reserve-button" (click)="reserve()">Reserve</button>

  @if (numberOfNights() > 0) {
    <div class="price-breakdown">
      <p>You won't be charged yet</p>
      <div class="price-item">
        <span>\${{ pricePerNight() }} x {{ numberOfNights() }} nights</span>
        <span>\${{ basePrice() }}</span>
      </div>
      @if (cleaningFee() > 0) {
        <div class="price-item">
          <span>Cleaning fee</span>
          <span>\${{ cleaningFee() }}</span>
        </div>
      }
      @if (serviceFee() > 0) {
        <div class="price-item">
          <span>Service fee</span>
          <span>\${{ serviceFee().toFixed(2) }}</span>
        </div>
      }
      <div class="price-total">
        <span>Total</span>
        <span>\${{ totalPrice().toFixed(2) }}</span>
      </div>
    </div>
  }
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  min-width: 400px;
  background-color: white;
}

.widget-container {
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-lg, 12px);
  padding: var(--haven-spacing-4, 24px);
  box-shadow: var(--haven-shadow-subtle, 0px 4px 12px rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-4, 24px);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
}

.price strong {
  font-size: var(--haven-text-lg, 18px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
}

.widget-body {
  display: flex;
  flex-direction: column;
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-md, 8px);
}

.date-picker {
  display: flex;
  width: 100%;
}

.date-input {
  width: 50%;
  padding: var(--haven-spacing-2, 8px) var(--haven-spacing-3, 16px);
}

.date-input:first-child {
  border-right: var(--haven-border-default, 1px solid #EAEAEA);
}

.date-input label,
.guest-selector label {
  display: block;
  font-size: var(--haven-text-xs, 12px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin-bottom: var(--haven-spacing-1, 4px);
}

.date-input input,
.guest-selector select {
  width: 100%;
  border: none;
  outline: none;
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  background: none;
}

.guest-selector {
  padding: var(--haven-spacing-2, 8px) var(--haven-spacing-3, 16px);
  border-top: var(--haven-border-default, 1px solid #EAEAEA);
}

.reserve-button {
  width: 100%;
  padding: var(--haven-spacing-3, 16px);
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-surface, #FFFFFF);
  background-color: var(--haven-primary, #007A7A);
  border: none;
  border-radius: var(--haven-border-radius-md, 8px);
  cursor: pointer;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.reserve-button:hover {
  background-color: var(--haven-primary-dark, #005C5C);
}

.price-breakdown {
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-3, 16px);
  text-align: center;
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-secondary, #555555);
}

.price-breakdown p {
  margin: 0;
}

.price-item, .price-total {
  display: flex;
  justify-content: space-between;
}

.price-total {
  margin-top: var(--haven-spacing-3, 16px);
  padding-top: var(--haven-spacing-3, 16px);
  border-top: var(--haven-border-default, 1px solid #EAEAEA);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingWidgetComponent {
  // Inputs
  pricePerNight = input<number>(0);
  cleaningFee = input<number>(0);
  serviceFeePercent = input<number>(0);
  rating = input<number>(0);
  reviewCount = input<number>(0);
  maxGuests = input<number>(0);
  selectedGuests = input<number>(1);
  selectedCheckInDate = input<string>('');
  selectedCheckOutDate = input<string>('');
  checkInDate = linkedSignal<Date | null>(() => {
    if (this.selectedCheckInDate() !== '') {
      return new Date(this.selectedCheckInDate());
    }
    return null;
  });
  checkOutDate = linkedSignal<Date | null>(() => {
    if (this.selectedCheckOutDate() !== '') {
      return new Date(this.selectedCheckOutDate());
    }
    return null;
  });
  guestCount = linkedSignal(() => this.selectedGuests());

  // Computed signals to format dates for the input[type=date] value property
  checkInDateString = computed(() => this.formatDate(this.checkInDate()));
  checkOutDateString = computed(() => this.formatDate(this.checkOutDate()));

  // Computed Signals for Price Calculation
  numberOfNights = computed(() => {
    const start = this.checkInDate();
    const end = this.checkOutDate();
    if (!start || !end || end <= start) {
      return 0;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });

  basePrice = computed(() => this.pricePerNight() * this.numberOfNights());
  serviceFee = computed(() => this.basePrice() * this.serviceFeePercent());
  totalPrice = computed(() => this.basePrice() + this.serviceFee() + this.cleaningFee());

  // In a real app, this would trigger a booking process via a service.
  reserve() {
    if (this.numberOfNights() > 0) {
      alert(`Booking for ${this.numberOfNights()} nights! Total: $${this.totalPrice()}`);
    } else {
      alert('Please select valid check-in and check-out dates.');
    }
  }

  onCheckInChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      this.checkInDate.set(null);
      return;
    }
    // Manually parse the date string to avoid timezone issues
    const [year, month, day] = input.value.split('-').map(Number);
    this.checkInDate.set(new Date(year, month - 1, day));
  }

  onCheckOutChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Change checkout', input);
    if (!input.value) {
      this.checkOutDate.set(null);
      return;
    }
    // Manually parse the date string to avoid timezone issues
    const [year, month, day] = input.value.split('-').map(Number);
    this.checkOutDate.set(new Date(year, month - 1, day));
  }

  onGuestsChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.guestCount.set(parseInt(select.value, 10));
  }

  private formatDate(date: Date | null): string {
    if (!date) {
      return '';
    }
    // Converts to YYYY-MM-DD format, handling timezone offsets.
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
