/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BookingStatus = 'Upcoming' | 'Past' | 'Cancelled';
export type Booking = {
  property: {
    name: string;
    imageUrl: string;
  };
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
};

@Component({
  selector: 'app-user-booking-card',
  standalone: true,
  imports: [],
  template: `@if (booking(); as bookingData) {
  <div class="card-container" [class]="bookingData.status.toLowerCase()">
    <div class="image-wrapper">
      <img [src]="bookingData.property.imageUrl" [alt]="bookingData.property.name" fill>
    </div>
    <div class="content-wrapper">
      <div class="property-info">
        <h3 class="property-name">{{ bookingData.property.name }}</h3>
        <div class="status-badge">{{ bookingData.status }}</div>
      </div>
      <div class="trip-info">
        <div class="date-item">
          <span class="label">Check-in</span>
          <span class="value">{{ bookingData.checkInDate }}</span>
        </div>
        <div class="date-item">
          <span class="label">Checkout</span>
          <span class="value">{{ bookingData.checkOutDate }}</span>
        </div>
      </div>
      <div class="actions">
        <button class="action-button">View Itinerary</button>
      </div>
    </div>
  </div>
}`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
}

.card-container {
  display: flex;
  gap: var(--haven-spacing-4, 24px);
  background-color: var(--haven-surface, #FFFFFF);
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-lg, 12px);
  box-shadow: var(--haven-shadow-subtle, 0px 4px 12px rgba(0, 0, 0, 0.05));
  overflow: hidden;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.card-container:hover {
  box-shadow: var(--haven-shadow-medium, 0px 6px 16px rgba(0, 0, 0, 0.08));
  transform: translateY(-2px);
}

.image-wrapper {
  position: relative;
  width: 200px;
  flex-shrink: 0;
}

.image-wrapper img {
  object-fit: cover;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--haven-spacing-4, 24px);
  flex-grow: 1;
}

.property-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--haven-spacing-3, 16px);
}

.property-name {
  font-size: var(--haven-text-lg, 18px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin: 0;
}

.status-badge {
  font-size: var(--haven-text-xs, 12px);
  font-weight: var(--haven-font-weight-medium, 500);
  padding: var(--haven-spacing-1, 4px) var(--haven-spacing-2, 8px);
  border-radius: 999px;
  color: var(--haven-surface, #FFFFFF);
  flex-shrink: 0;
}

.card-container.upcoming .status-badge { background-color: var(--haven-primary, #007A7A); }
.card-container.past .status-badge { background-color: var(--haven-text-muted, #888888); }
.card-container.cancelled .status-badge { background-color: var(--haven-error, #dc3545); }

.trip-info {
  display: flex;
  gap: var(--haven-spacing-5, 32px);
  margin: var(--haven-spacing-3, 16px) 0;
}

.date-item .label {
  display: block;
  font-size: var(--haven-text-sm, 14px);
  color: var(--haven-text-muted, #888888);
}

.date-item .value {
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-medium, 500);
}

.actions {
  margin-top: auto;
  padding-top: var(--haven-spacing-3, 16px);
  border-top: var(--haven-border-default, 1px solid #EAEAEA);
}

.action-button {
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  font-weight: var(--haven-font-weight-medium, 500);
  color: var(--haven-text-primary, #222222);
  background-color: var(--haven-surface, #FFFFFF);
  border: var(--haven-border-default, 1px solid #EAEAEA);
  border-radius: var(--haven-border-radius-md, 8px);
  padding: var(--haven-spacing-2, 8px) var(--haven-spacing-3, 16px);
  cursor: pointer;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.action-button:hover {
  background-color: var(--haven-bg, #F9F9F9);
  border-color: var(--haven-text-primary, #222222);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBookingCardComponent {
  booking = input<Booking>({
    property: {
      name: '',
      imageUrl: '',
    },
    checkInDate: '',
    checkOutDate: '',
    status: 'Upcoming',
  });
}
