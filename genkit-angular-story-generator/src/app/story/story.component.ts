/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject, resource, computed, linkedSignal } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoryService } from '../story.service';
import { runFlow } from 'genkit/beta/client';
import { ImageComponent } from '../image/image.component';
import { UserInputComponent } from '../user-input/user-input.component';

const BEGIN_FLOW = 'beginStoryFlow';
const CONTINUE_FLOW = 'continueStoryFlow';
const DEFAULT_STORY: StoryData = {
  primaryObjective: '',
  storyParts: [],
  options: [],
  rating: 'NEUTRAL',
  progress: 0
};

@Component({
  selector: 'app-story',
  imports: [PercentPipe, ImageComponent, UserInputComponent, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  storyService = inject(StoryService);
  endpoint = computed(() => this.storyService.hasStoryStarted() ? CONTINUE_FLOW : BEGIN_FLOW);

  // Data to control presentational state
  isStoryOver = computed(() => this.progress() && this.progress() === 1);
  showTheEnd = computed(() => this.isStoryOver() && !this.storyResource.isLoading());
  loadingStories = ['', '', ''];

  // Use a linked signal to preserve old value while storyResource is loading
  primaryObjective = linkedSignal<string, string>({
    source: () => this.storyResource.value().primaryObjective,
    computation: (newPrimaryObjective, previous) => {
      const useOldValue = this.storyResource.isLoading() || newPrimaryObjective === '';
      return useOldValue ? (previous?.value || '') : newPrimaryObjective;
    }
  });

  // Use a linked signal to preserve old value while storyResource is loading
  progress = linkedSignal<number, number>({
    source: () => this.storyResource.value().progress,
    computation: (newProgress, previous) => {
      const useOldValue = this.storyResource.isLoading() || newProgress === -1;
      return useOldValue ? (previous?.value || 0) : newProgress;
    }
  });

  // Use a linked signal to preserve existing parts of the story
  storyParts = linkedSignal<string[], string[]>({
    source: () => this.storyResource.value().storyParts,
    computation: (newStoryParts, previous) => {
      if (this.endpoint() === BEGIN_FLOW) {
        return newStoryParts;
      } else {
        return [...previous!.value, ...newStoryParts];
      }
    }
  });

  // A resource that requests story data
  storyResource = resource({
    defaultValue: DEFAULT_STORY,
    request: () => this.storyService.storyInput(),
    loader: ({request}): Promise<StoryData> => {
      const url = this.endpoint();
      return runFlow({ url, input: {
        userInput: request,
        sessionId: this.storyService.sessionId()
      }});
    }
  });
}

interface StoryData {
  primaryObjective: string;
  storyParts: string[];
  options: string[];
  rating: string;
  progress: number;
}
