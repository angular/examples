/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RatingStarsComponent } from './rating-stars.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-widget',
  standalone: true,
  imports: [RatingStarsComponent, FormsModule],
  templateUrl: './booking-widget.component.html',
  styleUrls: ['./booking-widget.component.css'],
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
