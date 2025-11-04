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
import { Award } from '../data-store';

@Component({
  selector: 'app-award-badge',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './award-badge.component.html',
  styleUrl: './award-badge.component.css',
})
export class AwardBadgeComponent {
  award = input<Award>();
}
