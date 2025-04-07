/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject, resource, computed, input, ResourceStatus } from '@angular/core';
import { StoryService } from '../story.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { runFlow } from 'genkit/beta/client';

const IMG_FLOW = 'genImgFlow';
const LOADING_STATUSES = [ResourceStatus.Loading, ResourceStatus.Reloading];

@Component({
  selector: 'app-image',
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  private readonly agentService = inject(StoryService);
  story = input<string>('');
  isLoading = computed(() => LOADING_STATUSES.includes(this.imgResource.status()));

  imgResource = resource({
    defaultValue: '',
    request: () => this.story(),
    loader: ({request}) => {
      return runFlow({
        url: IMG_FLOW,
        input: { story: request, sessionId: this.agentService.sessionId() }
      });
    }
  });
}
