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
  templateUrl: './user-booking-card.component.html',
  styleUrls: ['./user-booking-card.component.css'],
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
