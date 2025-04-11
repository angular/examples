/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { StoryComponent } from './story/story.component';
import { UserInputComponent } from './user-input/user-input.component';
import { StoryService, DESCRIPTION_FLOW } from './story.service';

@Component({
  selector: 'app-root',
  imports: [StoryComponent, UserInputComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  storyService = inject(StoryService);
  endpoint = DESCRIPTION_FLOW;
}