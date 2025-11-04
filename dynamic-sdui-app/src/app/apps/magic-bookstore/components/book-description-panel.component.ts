/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-description-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-description-panel.component.html',
  styleUrl: './book-description-panel.component.css',
})
export class BookDescriptionPanelComponent {
  description = input<string>();
  isExpanded = signal(false);
  readonly maxLength = 300; // Characters before truncating

  toggleExpand() {
    this.isExpanded.update(value => !value);
  }

  get displayDescription(): string {
    const desc = this.description();
    if (!desc) {
      return '';
    }
    if (this.isExpanded() || desc.length <= this.maxLength) {
      return desc;
    }
    return desc.substring(0, this.maxLength) + '...';
  }

  get showToggle(): boolean {
    const desc = this.description();
    return !!desc && desc.length > this.maxLength;
  }
}
