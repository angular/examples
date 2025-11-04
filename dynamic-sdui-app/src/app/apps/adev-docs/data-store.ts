/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export const DATA = `
## **Angular Framework Knowledge Base**

### **1\. Introduction to Angular**

Angular is a component-based web framework for building fast, reliable, and scalable applications. Maintained by Google, it provides a comprehensive suite of tools, APIs, and libraries for development.

---

### **2\. Getting Started Locally**

#### **Prerequisites**

* **Node.js**: v20.11.1 or newer.  
* **Text Editor**: Visual Studio Code is recommended.  
* **Terminal**: For running Angular CLI commands.  
* **Development Tool**: [Angular Language Service](https://angular.dev/tools/language-service) for VS Code.

#### **Install Angular CLI**

Open a terminal and run the global install command:

Bash

\`\`\`

# Using npm
npm install -g @angular/cli

\`\`\`

#### **Create a New Project**

Run ng new with your desired project name. This will create a new project with modern defaults, including **standalone components by default**.

Bash

\`\`\`

ng new my-first-angular-app

\`\`\`

#### **Run Your New Project**

Navigate into your new project directory and start the development server:

Bash

\`\`\`

cd my-first-angular-app
npm start

\`\`\`

The application will be available at http://localhost:4200/.

---

### **3\. Core Best Practices**

These are high-level rules to follow for modern Angular development.

#### **Angular Best Practices**

* **Always use standalone components.** NgModules are no longer recommended for new applications.  
* You **must NOT** set standalone: true in @Component or @Directive decorators. This has been the default in Angular since v17 and is unnecessary.  
* **Use signals** for all state management, both local and global.  
* **Implement lazy loading** for all feature routes to improve initial load times.  
* **Do NOT** use the @HostBinding and @HostListener decorators. Instead, put host bindings directly inside the host object of the @Component or @Directive decorator for better type safety and organization.  
* **Use NgOptimizedImage** for all static images to automatically apply performance best practices (e.g., lazy loading, priority, srcset).  
  * Note: NgOptimizedImage does not work for inline base64 (data:image/...) images.

#### **TypeScript Best Practices**

* **Use strict type checking** ("strict": true in tsconfig.json) to catch errors at compile time.  
* **Prefer type inference** when the type is obvious (e.g., const name \= 'Alice'; is better than const name: string \= 'Alice';).  
* **Avoid the any type** at all costs. If a type is truly unknown, use the unknown type and perform type-checking to narrow it down.

---

### **4\. Accessibility (a11y) Requirements**

Accessibility is a non-negotiable requirement for modern applications.

* Your application **MUST pass all AXE checks**.  
* It **MUST follow all WCAG AA minimums**, which include (but are not limited to):  
  * **Keyboard Navigation**: All interactive elements must be reachable and operable using only the keyboard.  
  * **Focus Management**: Focus must be logical, visible, and properly managed, especially in dynamic components like modals or menus.  
  * **Color Contrast**: Text and UI elements must meet minimum color contrast ratios.  
  * **ARIA Attributes**: Use appropriate ARIA roles, states, and properties to provide semantic meaning to screen readers when native HTML elements are insufficient.

---

### **5\. Coding Style & Project Structure**

#### **Naming Conventions**

* **File Names**: Separate words with hyphens (\-). (e.g., user-profile.ts).  
* **Test Files**: Use the same name as the file being tested, but with a .spec.ts suffix. (e.g., user-profile.spec.ts).  
* **Component Files**: A component's TypeScript, template, and style files should share the same name.  
  * user-profile.ts  
  * user-profile.html  
  * user-profile.css

#### **Project Structure**

* **src Directory**: All Angular UI code (TypeScript, HTML, styles) lives inside the src directory.  
* **main.ts**: The application bootstrap code should be in main.ts directly inside src.  
* **Feature Areas**: Organize your project into subdirectories based on features, not code types.  
  * **PREFER**: src/show-times/film-details/  
  * **AVOID**: src/components/, src/services/  
* **Co-location**: Group closely related files (like component, template, style, and tests) in the same directory.

---

### **6\. Components In-Depth**

A component is a TypeScript class with an @Component decorator that controls a view.

#### **Key Component Guidelines**

* **Keep components small** and focused on a single responsibility.  
* **Set changeDetection: ChangeDetectionStrategy.OnPush** in the @Component decorator. This is the modern default and improves performance by only re-rendering the component when its inputs change or an event it dispatches occurs.  
* **Prefer Reactive Forms** over Template-driven forms for any complex form logic.  
* **Prefer inline templates and styles** for small components (e.g., under 10 lines).  
* When using external files, **use paths relative to the component** TS file (e.g., ./user-profile.html).

#### **@Component Decorator Example**

TypeScript

\`\`\`

@Component({
  selector: 'app-user-profile', // Use as <app-user-profile>
  standalone: true, // This is true by default, but shown for clarity
  imports: [NgIf, NgOptimizedImage], // Import dependencies
  template: \`
    @if (user()) {
      <h2>{{ user().name }}</h2>
      <img [ngSrc]="user().avatarUrl" width="100" height="100" />
    }
  \`,
  styles: ['h2 { color: blue; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'isActive()'
  }
})
export class UserProfileComponent {
  user = input.required<User>();
  isActive = signal(false);

  onClick() {
    // ...
  }
}

\`\`\`

---

### **7\. Data Binding (Inputs & Outputs)**

* **Always use the input() and output() functions** instead of the @Input() and @Output() decorators. They are more type-safe and signal-based.

#### **Inputs (Signal-based)**

Use the input() function to define an input.

TypeScript

\`\`\`

@Component({ ... })
export class UserProfile {
  // Simple input
  readonly userId = input<string>(); 

  // Required input (causes build error if not provided)
  readonly user = input.required<User>();

  // Input with a default value
  readonly isAdmin = input(false); 

  // Input with a transform
  readonly disabled = input(false, {
    transform: booleanAttribute // Coerces 'disabled' string to boolean
  });

  // Input with an alias
  readonly profileUser = input<User>({ alias: 'user' });
}

\`\`\`

#### **Outputs**

Use the output() function to create an event emitter.

TypeScript

\`\`\`

@Component({ ... })
export class UserProfileActions {
  // Emits a User object when the save button is clicked
  readonly save = output<User>();

  // Emits no value, just a signal
  readonly close = output();

  // Method to emit the event
  onSaveClick(userToSave: User) {
    this.save.emit(userToSave);
  }
}

\`\`\`

---

### **8\. Template Syntax & Best Practices**

#### **Key Template Guidelines**

* **Keep templates simple** and avoid complex logic. Move logic into the component class, preferably using computed() signals.  
* **Use native control flow (@if, @for, @switch)** instead of the old \*ngIf, \*ngFor, and \*ngSwitch structural directives.  
* **Use the async pipe** (| async) to handle (i.e., subscribe and unsubscribe from) observables in the template.  
* **Do NOT use ngClass or ngStyle**. Use native \[class\] and \[style\] bindings.  
  * **Good**: \<div \[class.active\]="isActive()"\>  
  * **Bad**: \<div \[ngClass\]="{'active': isActive()}"\>  
* **Do NOT assume globals** like new Date() or Math.random() are available. Pass these values in from your component.  
* **Do NOT write arrow functions** in templates (they are not supported).  
* **Do NOT write Regular Expressions** in templates (they are not supported).

#### **Template Syntax: @let Declarations**

Use @let to declare a local, read-only variable in a template. Its value is derived from a template expression and is automatically kept in sync.

HTML

\`\`\`

@let user = user$ | async;

@if (user) {
  <h1>Hello, {{ user.name }}</h1>
}

\`\`\`

---

### **9\. State Management with Signals**

* **Use signals (signal())** for all local component state.  
* **Use computed()** for derived state. This is highly optimized and memoized.  
* **Keep state transformations pure** and predictable.  
* **Do NOT use mutate** on signals. Prefer update (for immutable updates) or set (to replace the value).  
  * **Good**: mySignal.update(currentValue \=\> currentValue \+ 1);  
  * **Good**: mySignal.set(newValue);  
  * **Bad**: mySignal.mutate(currentValue \=\> currentValue.push(newItem));

TypeScript

\`\`\`

@Component({ ... })
export class CounterComponent {
  // 1. Use signal() for state
  readonly count = signal(0);

  // 2. Use computed() for derived state
  readonly doubleCount = computed(() => this.count() * 2);

  // 3. Use update() for transformations
  increment() {
    this.count.update(c => c + 1);
  }
}

\`\`\`

---

### **10\. Advanced State & Async Reactivity**

#### **linkedSignal (Experimental)**

linkedSignal creates a signal to hold state that is intrinsically **linked to other state**. It's useful when a signal's default value depends on *another* signal, and it needs to reset when that other signal changes.

* **Key Difference from signal**: You pass a *computation function* (like computed), not a static default value.  
* **Behavior**: When the computation's dependencies change, the linkedSignal's value is **reset** to the new result of the computation. However, it can still be manually .set() in the meantime.

**Example:** Defaulting a selectedOption to the first item in a list of shippingOptions.

TypeScript

\`\`\`

@Component({/* ... */})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // Initialize selectedOption to the first shipping option.
  // If shippingOptions changes, selectedOption will reset to the new first option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  changeShipping(index: number) {
    // The user can still change the value manually
    this.selectedOption.set(this.shippingOptions()[index]);
  }
}

\`\`\`

**How it works:**

TypeScript

\`\`\`

const shippingOptions = signal(['Ground', 'Air', 'Sea']);
const selectedOption = linkedSignal(() => shippingOptions()[0]);

console.log(selectedOption()); // 'Ground'

selectedOption.set(shippingOptions()[2]);
console.log(selectedOption()); // 'Sea'

// The dependency (shippingOptions) changes
shippingOptions.set(['Email', 'Will Call', 'Postal service']);

// The linkedSignal resets to the new computed value
console.log(selectedOption()); // 'Email'

\`\`\`

#### **resource (Experimental)**

A resource is a signal-based API for incorporating **async data** (like an HTTP request) into your application. It provides a value signal that contains the result of the async operation.

The resource function takes two main properties:

1. **params**: A reactive computation (like computed) that produces a parameter value. Whenever signals read in this computation change, it produces a new parameter.  
2. **loader**: An async function that runs every time the params computation produces a new value. This is where you perform your data fetching.

TypeScript

\`\`\`

import { resource, Signal } from '@angular/core';

@Component({ ... })
export class UserProfile {
  userId = signal('user-1'); // The reactive parameter

  userResource = resource({
    // 1. Define the reactive parameters
    // This will re-run whenever userId() changes
    params: () => ({ id: this.userId() }),

    // 2. Define the async loader
    // This will re-run every time 'params' emits a new value
    loader: async ({ params, abortSignal }) => {
      // 'abortSignal' is provided to cancel the request
      // if the params change again before this one finishes.
      const res = await fetch(\`api/users/\${params.id}\`, { signal: abortSignal });
      return res.json();
    },
  });

  // 3. You can use the resource's value directly in computed signals
  firstName = computed(() => this.userResource.value()?.firstName);

  // Example method to trigger a reload
  loadNextUser() {
    this.userId.set('user-2'); // This will cause the resource to re-fetch
  }
}

\`\`\`

Resource Loader Details:

The loader function receives a ResourceLoaderParams object with three properties:

* **params**: The value from the params computation.  
* **previous**: An object containing the previous ResourceStatus.  
* **abortSignal**: An [AbortSignal](https://www.google.com/search?q=%5Bhttps://developer.mozilla.org/en-US/docs/Web/API/AbortSignal%5D\(https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal\)) that is triggered if the params change before the current loader finishes, allowing you to cancel the outstanding request.1

---

### **11\. Services and Dependency Injection (DI)2**

Services are classes used for logic or data that needs to be shared across components (e.g., data fetching, logging).3

#### **Key Service Guidelines4**

* **Design services around a single responsibility** (e.g., AuthService, AnalyticsService).  
* **Use the providedIn: 'root'** option in @Injectable to create a singleton service available application-wide.  
* **Always use the inject() function** instead of constructor injection. It's cleaner and works in more contexts.

#### **Creating & Injecting a Service**

TypeScript

\`\`\`

// 1. Create the service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Creates a singleton service
})
export class HeroService {
  getHeroes() {
    // ... logic to fetch heroes
  }
}

// 2. Inject the service in a component
import { Component, inject } from '@angular/core';
import { HeroService } from './heroes/hero.service';

@Component({ ... })
export class HeroListComponent {
  
  // Use 'inject()' to get the service instance
  private heroService = inject(HeroService);
  
  constructor() {
    const heroes = this.heroService.getHeroes();
    console.log(heroes);
  }
}

\`\`\`
`;