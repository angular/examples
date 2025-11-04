/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all the components to be showcased
import { LearnMoreButtonComponent } from './learn-more-button.component';
import { SectionTitleComponent } from './section-title.component';
import { SubsectionTitleComponent } from './subsection-title.component';
import { ConceptExplanationComponent } from './concept-explanation.component';
import { ApiReferenceComponent } from './api-reference.component';
import { CodeSnippetComponent } from './code-snippet.component';
import { FullCodeExampleComponent } from './full-code-example.component';
import { CalloutComponent } from './callout.component';
import { TopicCardComponent } from './topic-card.component';

@Component({
  selector: 'app-adev-docs-component-showcase',
  standalone: true,
  imports: [
    CommonModule,
    LearnMoreButtonComponent,
    SectionTitleComponent,
    SubsectionTitleComponent,
    ConceptExplanationComponent,
    ApiReferenceComponent,
    CodeSnippetComponent,
    FullCodeExampleComponent,
    CalloutComponent,
    TopicCardComponent,
  ],
  template: `
    <div class="showcase-container">
      <h1>Component Showcase: adev-docs</h1>

      <section class="component-wrapper">
        <h2>LearnMoreButtonComponent</h2>
        <app-learn-more-button buttonText="Learn More" topic="Angular Signals" />
      </section>

      <section class="component-wrapper">
        <h2>SectionTitleComponent</h2>
        <adev-section-title title="Getting Started with Angular" />
      </section>

      <section class="component-wrapper">
        <h2>SubsectionTitleComponent</h2>
        <adev-subsection-title title="Installation" />
      </section>

      <section class="component-wrapper">
        <h2>ConceptExplanationComponent</h2>
        <adev-concept-explanation [content]="conceptExplanationContent" />
      </section>

      <section class="component-wrapper">
        <h2>ApiReferenceComponent</h2>
        <adev-api-reference [apiItem]="apiItem" />
      </section>

      <section class="component-wrapper">
        <h2>CodeSnippetComponent</h2>
        <adev-code-snippet [code]="codeSnippet" language="typescript" />
      </section>

      <section class="component-wrapper">
        <h2>FullCodeExampleComponent</h2>
        <adev-full-code-example [example]="fullCodeExample" />
      </section>

      <section class="component-wrapper">
        <h2>CalloutComponent</h2>
        <div class="callout-grid">
          <adev-callout type="info" content="This is an informational message." />
          <adev-callout type="warning" content="This is a warning message." />
          <adev-callout type="danger" content="This is a danger message." />
          <adev-callout type="tip" content="This is a tip." />
        </div>
      </section>

      <section class="component-wrapper">
        <h2>TopicCardComponent</h2>
        <app-topic-card topic="Angular Forms" description="Learn about building forms in Angular." />
      </section>
    </div>
  `,
  styles: [
    `
    .showcase-container {
      padding: 2rem;
      background-color: var(--adev-docs-background);
      color: var(--adev-docs-text-primary);
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--adev-docs-border);
      padding-bottom: 1rem;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--adev-docs-primary);
    }
    .component-wrapper {
      margin-bottom: 3rem;
      padding: 1.5rem;
      border: 1px solid var(--adev-docs-border);
      border-radius: var(--adev-docs-border-radius-lg);
      background-color: var(--adev-docs-surface);
    }
    .callout-grid {
      display: grid;
      gap: 1rem;
    }
  `]
})
export class AdevDocsComponentShowcaseComponent {
  conceptExplanationContent = 
    `
    <p>This is a paragraph explaining a core concept in Angular. It can contain <strong>strong</strong> text, <em>emphasized</em> text, and even <code>inline code</code>.</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  
`;

  apiItem = {
    name: 'Component',
    typeSignature: 'Decorator',
    description: 'A decorator that marks a class as an Angular component and provides configuration metadata that determines how the component should be processed, instantiated, and used at runtime.',
    parameters: [
      { name: 'selector', type: 'string', description: 'The CSS selector that identifies this directive in a template.' },
      { name: 'templateUrl', type: 'string', description: 'The URL of a template file for an Angular component.' }
    ]
  };

  codeSnippet = 
    `
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      template: '<h1>Hello, Angular!</h1>'
    })
    export class AppComponent {}
  
`;

  fullCodeExample = {
    title: 'Standalone Component Example',
    description: 'This example shows a basic standalone component in Angular.',
    code: this.codeSnippet,
    language: 'typescript'
  };
}
