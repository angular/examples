/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestseller-ribbon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bestseller-ribbon.component.html',
  styleUrl: './bestseller-ribbon.component.css',
})
export class BestsellerRibbonComponent {
  rank = input<number>();
}
