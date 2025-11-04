/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { RouterOutlet } from '@angular/router';
import { APP_CONTEXT } from '../magic-ai/app-context';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, ChatComponent, RouterOutlet],
  templateUrl: './base.html',
  styleUrls: ['./base.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Base {
  appName = APP_CONTEXT.appName;
  theme = APP_CONTEXT.theme;
}
