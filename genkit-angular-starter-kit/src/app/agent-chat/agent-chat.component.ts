/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-agent-chat',
  imports: [MatIconModule, FormsModule, MatProgressBarModule],
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.scss'
})
export class AgentChatComponent {
  agentService = inject(AgentService);
  userInput = '';

  onSubmit(): void {
    if (this.userInput !== '') {
      this.agentService.updateChatFromUser(this.userInput);
      this.userInput = '';
    }
  }
}