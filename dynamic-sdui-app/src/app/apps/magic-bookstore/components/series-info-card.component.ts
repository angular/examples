/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-series-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './series-info-card.component.html',
  styleUrl: './series-info-card.component.css',
})
export class SeriesInfoCardComponent {
  series = input<{ name: string; number: number }>();
}
