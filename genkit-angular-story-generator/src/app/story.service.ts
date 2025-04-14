/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injectable, signal, linkedSignal, resource } from '@angular/core';
import { runFlow } from 'genkit/beta/client';

export const DESCRIPTION_FLOW = 'descriptionFlow';
const DEFAULT_PREMISE: StoryPremise = {
  storyPremise: 'Make up a story',
  nextQuestion: '',
  premiseOptions: []
};

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  // Used to manage app presentation state
  hasStoryStarted = signal(false);
  // Used to manage input the story description requests
  premiseInput = signal('');
  // Used to manage input the story generation requests
  storyInput = signal('');
  // Only set this on the initial request

  // Only set this on the first request
  sessionId = linkedSignal<string, string>({
    source: () => this.premiseResource.value().storyPremise,
    computation: (_agentResponse, previous) =>
      (!previous ? Date.now() + '' + Math.floor(Math.random() * 1000000000) : previous.value)
  });

  // Used to determine whether to show the update story button in the UserInputComponenet
  hasPremiseUpdated = linkedSignal<string, boolean>({
    source: () => (this.premiseResource.value().storyPremise),
    computation: (newPremise, previous) => (previous || false) && newPremise !== previous!.source
  });

  // Only clear the session on initial page load
  clearSession = linkedSignal<string, boolean>({
    source: () => this.premiseResource.value().storyPremise,
    computation: (_newPremise, previous) => !previous
  });

  // A resource that requests update story premise information based on user input
  premiseResource = resource({
    defaultValue: DEFAULT_PREMISE,
    request: () => this.premiseInput(),
    loader: ({request}): Promise<StoryPremise> => runFlow({
      url: DESCRIPTION_FLOW,
      input: {
        userInput: request,
        sessionId: this.sessionId(),
        clearSession: this.clearSession()
      }
    })
  });
}

interface StoryPremise {
  storyPremise: string;
  nextQuestion: string;
  premiseOptions: string[];
}