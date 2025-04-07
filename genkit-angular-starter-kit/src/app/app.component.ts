/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject } from '@angular/core';
import { AgentChatComponent } from './agent-chat/agent-chat.component';
import { AgentService } from './agent.service';

@Component({
  selector: 'app-root',
  imports: [AgentChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  agentService = inject(AgentService);
}