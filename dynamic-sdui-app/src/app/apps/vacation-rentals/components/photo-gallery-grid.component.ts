/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-grid',
  standalone: true,
  imports: [],
  templateUrl: './photo-gallery-grid.component.html',
  styleUrls: ['./photo-gallery-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryGridComponent {
  imageUrls = input<string[]>([]);
  propertyTitle = input<string>('');
}
