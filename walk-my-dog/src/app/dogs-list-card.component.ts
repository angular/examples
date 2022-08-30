/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dog } from './dogs.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dogs-list-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <article class="pet-card">
    <img class="pet-img" src="{{dog.photoUrl}}" alt="Photo of {{dog.name}}">
    <p class="pet-headline">Meet <span class="pet-name">{{dog.name}}</span></p>
    <p class="pet-description"> 
      <span class="pet-name">{{dog.ownerName}}</span> wants you to know this about {{dog.name}}:
      {{dog.description}}
    </p>
    <p class="pet-learn-more"><a href="/details/{{index}}">Learn More</a></p>
  <article>
`,
  styles: [`
  .pet-card {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    width: 300px;
  }

  .pet-img {
    border-radius: 10px 10px 0 0;
    width: 300px;
  }

  .pet-name {
    font-weight: bolder;
  }

  .pet-description, .pet-headline, .pet-learn-more {
    padding: 10px;
  }

  .pet-headline {
    font-size: 18pt;
  }
`]
})
export class DogsListCardComponent implements OnInit {
  @Input() dog!: Dog;
  @Input() index!: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
