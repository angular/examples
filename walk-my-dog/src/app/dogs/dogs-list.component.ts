/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsService } from './dogs.service';
import { DogsListCardComponent } from './dogs-list-card.component';

@Component({
  selector: 'app-dogs-list',
  standalone: true,
  imports: [CommonModule, DogsListCardComponent],
  template: `
    <section class="hero-section">
      <h2 class="hero-text">
        Discover Pets to walk near you
      </h2>
    </section>
    <input type="text" placeholder="Filter by dog name" #filter>
    <button class="primary" type="button" (click)="filterResults(filter)">Search</button>
    <article class="pet-list">
      <app-dogs-list-card *ngFor="let dog of dogsService.dogs; let i = index" [index]="i" [dog]="dog" />
    </article>
`,
  styles: [`
  .pet-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    padding: 10px;
  }

  .hero-text {
    font-size: 25pt;
    padding: 10px;
  }
`]
})
export class DogsListComponent implements OnInit {

  constructor(readonly dogsService: DogsService) { }

  ngOnInit(): void {
    this.dogsService.dogName$.subscribe(console.log);
    this.dogsService.filterList$.subscribe(console.log);
  }


  filterResults(filter: HTMLInputElement): void {
    this.dogsService.filterDog(filter.value);
  }

}
