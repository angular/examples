import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  imports: [],
  template: `
    <nav class="absolute left-0 top-0 h-full w-14 bg-surface-container-low flex flex-col items-center py-6 gap-6 z-[500] transition-colors duration-300">
      <button class="bg-surface-container-highest text-primary border-l-4 border-primary p-2 transition-colors">
        <span class="material-symbols-outlined">local_shipping</span>
      </button>
    </nav>
  `
})
export class Sidenav {}