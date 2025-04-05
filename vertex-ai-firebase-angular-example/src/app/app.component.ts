/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject, signal } from '@angular/core';
import { AiService } from './ai.service';

@Component({
  selector: 'app-root',
  template: `
    <section>
      <h1>Vertex AI in Firebase Angular Example</h1>
      <p class="title">Here's a story created using Vertex AI in Firebase</p>
      <p class="content">
          @if (story() === '') {
            Loading...
          }
          @else {
            {{story()}}
          }
      </p>
    </section>
  `,
  styles: `
    .title, .content {
      border: solid 1px black;
      border-radius: 5px;
      padding: 20px;
    }
  `,
})
export class AppComponent {
  private readonly aiService = inject(AiService);
  readonly story = signal('');

  constructor() {
    this.aiService.ask('Tell me a story about a magic backpack').then(text => this.story.set(text));
  }
}
