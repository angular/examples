/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Define the type for the host input right here for clarity and type safety.
export type Host = {
  name: string;
  avatarUrl: string;
  joinDate: string;
  isSuperhost: boolean;
};

@Component({
  selector: 'app-host-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './host-profile-card.component.html',
  styleUrls: ['./host-profile-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostProfileCardComponent {
  host = input<Host>();
}
