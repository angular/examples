/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AlertStatus = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [],
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'status()',
    '[attr.role]': '"alert"'
  },
})
export class AlertBannerComponent {
  message = input<string>();
  status = input<AlertStatus>("success");
  isDismissible = input<boolean>(false);

  get iconName(): string {
    switch (this.status()) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
    }
  }

  // In a real app, this would emit an event to self-destruct.
  dismiss() {
    console.log('Dismissing alert');
  }
}
