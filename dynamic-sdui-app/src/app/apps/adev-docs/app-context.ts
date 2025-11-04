/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Type } from '@angular/core';
import { LearnMoreButtonComponent } from './components/learn-more-button.component';
import { SectionTitleComponent } from './components/section-title.component';
import { SubsectionTitleComponent } from './components/subsection-title.component';
import { ConceptExplanationComponent } from './components/concept-explanation.component';
import { ApiReferenceComponent } from './components/api-reference.component';
import { CodeSnippetComponent } from './components/code-snippet.component';
import { FullCodeExampleComponent } from './components/full-code-example.component';
import { CalloutComponent } from './components/callout.component';
import { TopicCardComponent } from './components/topic-card.component';
import { ComponentContext } from '../../magic-ai/app-context';

// --- GENERATE CONTEXT DATA (from Step 6) ---
const GENERATED_COMPONENT_CONTEXT_DATA: ComponentContext[] = [
  {
    "name": "LearnMoreButtonComponent",
    "description": "A button that allows the user to request more information about a specific topic.",
    "type": "dynamicComponent",
    "inputs": {
      "buttonText": {
        "type": "string",
        "description": "The text to display on the button.",
        "required": true
      },
      "topic": {
        "type": "string",
        "description": "The topic to learn more about.",
        "required": true
      }
    }
  },
  {
    "name": "SectionTitleComponent",
    "description": "Displays a prominent title for a major section of documentation.",
    "type": "dynamicComponent",
    "inputs": {
      "title": {
        "type": "string",
        "description": "The main title text for the section.",
        "required": true
      }
    }
  },
  {
    "name": "SubsectionTitleComponent",
    "description": "Displays a title for a subsection within a major documentation section.",
    "type": "dynamicComponent",
    "inputs": {
      "title": {
        "type": "string",
        "description": "The title text for the subsection.",
        "required": true
      }
    }
  },
  {
    "name": "ConceptExplanationComponent",
    "description": "Renders a block of text explaining an Angular concept or providing general descriptive information.",
    "type": "dynamicComponent",
    "inputs": {
      "content": {
        "type": "string",
        "description": "The HTML content of the explanation.",
        "required": true
      }
    }
  },
  {
    "name": "ApiReferenceComponent",
    "description": "Displays detailed information about an Angular API (e.g., a class, interface, method, property, or decorator).",
    "type": "dynamicComponent",
    "inputs": {
      "apiItem": {
        "type": "{ name: string; typeSignature?: string; description: string; parameters?: { name: string; type: string; description: string; }[]; returnValue?: { type: string; description: string; }; }",
        "description": "An object containing the API item's name, optional type signature, description, optional parameters, and optional return value.",
        "required": true
      }
    }
  },
  {
    "name": "CodeSnippetComponent",
    "description": "Renders a small, inline, or block-level code snippet to illustrate a specific usage.",
    "type": "dynamicComponent",
    "inputs": {
      "code": {
        "type": "string",
        "description": "The code to display.",
        "required": true
      },
      "language": {
        "type": "string",
        "description": "The programming language of the code (e.g., 'typescript', 'html', 'css').",
        "required": true
      }
    }
  },
  {
    "name": "FullCodeExampleComponent",
    "description": "Displays a complete, runnable code example with accompanying explanations. Use this whenever a user asks for a code example.",
    "type": "dynamicComponent",
    "inputs": {
      "example": {
        "type": "{ title: string; description: string; code: string; language: string; }",
        "description": "An object containing the example's title, a detailed description, the code, and its language.",
        "required": true
      }
    }
  },
  {
    "name": "CalloutComponent",
    "description": "Displays important notes, warnings, tips, or other callout information.",
    "type": "dynamicComponent",
    "inputs": {
      "type": {
        "type": "'info' | 'warning' | 'danger' | 'tip'",
        "description": "The type of callout, determining its visual style.",
        "required": true
      },
      "content": {
        "type": "string",
        "description": "The HTML content of the callout message.",
        "required": true
      }
    }
  },
  {
    "name": "TopicCardComponent",
    "description": "A card to present a topic to a user for further exploration. It should be used on the welcome page or inline in explanatory content to offer related content.",
    "type": "dynamicComponent",
    "inputs": {
      "topic": {
        "type": "string",
        "description": "The topic to display on the card.",
        "required": true
      },
      "description": {
        "type": "string",
        "description": "A short description of the topic.",
        "required": true
      }
    }
  }
];

// --- GENERATE COMPONENT MAP ---
const GENERATED_COMPONENT_MAP: { [key: string]: Type<any> } = {
  'LearnMoreButtonComponent': LearnMoreButtonComponent,
  'SectionTitleComponent': SectionTitleComponent,
  'SubsectionTitleComponent': SubsectionTitleComponent,
  'ConceptExplanationComponent': ConceptExplanationComponent,
  'ApiReferenceComponent': ApiReferenceComponent,
  'CodeSnippetComponent': CodeSnippetComponent,
  'FullCodeExampleComponent': FullCodeExampleComponent,
  'CalloutComponent': CalloutComponent,
  'TopicCardComponent': TopicCardComponent,
};

const GENERATED_APP_DESCRIPTION = `
You are building a UI for a dynamic documentation site for the Angular web framework.
The goal is to surface relevant information efficiently, combining related concepts and different types of content (explanations, API references, code snippets, full examples) into a single view.

### 1. Domain-Specific Mapping Rules:
*   When you see data related to a 'concept explanation' or general descriptive text, you must use the \`ConceptExplanationComponent\`.
*   When you see data related to 'API reference' (methods, properties, fields, interfaces, types), you must use the \`ApiReferenceComponent\`.
*   When you see data related to 'short code snippets' for quick illustration, you must use the \`CodeSnippetComponent\`.
*   When you see data related to 'full code examples' with detailed explanations, you must use the \`FullCodeExampleComponent\`.
*   When you see data related to a 'section title' for major content divisions, you must use the \`SectionTitleComponent\`.
*   When you see data related to a 'subsection title' for minor content divisions, you must use the \`SubsectionTitleComponent\`.
*   When you see data related to a 'callout', 'note', 'warning', or 'tip', you must use the \`CalloutComponent\`.

### 2. Layout Compositions:
*   **DefaultLayout:** If no specific layoutHint is provided, you must render a single-column layout, stacking components vertically. This is suitable for general content flow.
*   **ConceptDetailLayout:** If layoutHint is "ConceptDetailLayout", you must render a vertical stack of components, prioritizing \`ConceptExplanationComponent\`, followed by relevant \`CodeSnippetComponent\` and optionally \`ApiReferenceComponent\` or \`FullCodeExampleComponent\` to provide comprehensive detail on a single concept.
*   **ApiReferenceLayout:** If layoutHint is "ApiReferenceLayout", you must render a layout focused on API details. This should primarily feature \`ApiReferenceComponent\`, potentially interleaved with \`CodeSnippetComponent\` for usage examples and \`ConceptExplanationComponent\` for introductory or explanatory text.
*   **CodeExampleLayout:** If layoutHint is "CodeExampleLayout", you must render a layout that highlights code examples. This should feature \`FullCodeExampleComponent\` prominently, accompanied by \`ConceptExplanationComponent\` for context and explanation, and optionally \`CodeSnippetComponent\` for smaller, related examples.
*   **MixedContentLayout:** If layoutHint is "MixedContentLayout", you must render a flexible vertical stack that can combine various content types (explanations, snippets, API details, full examples) in an order that best explains a complex topic. Use \`SectionTitleComponent\` and \`SubsectionTitleComponent\` to organize the content logically within this layout.
`;

const LOADING_TEXT: string[] = [
  "Compiling components... and my thoughts.",
  "Bootstrapping the AppModule... This is not a drill.",
  "Resolving dependencies... and existential crises.",
  "Waking up the Angular Ivy compiler... It's not a morning person.",
  "Running change detection... I see you're still waiting.",
  "Awaiting asynchronous operations... and the heat death of the universe.",
  "Fetching the latest bundle... It's heavier than it looks.",
  "Optimizing the critical rendering path... and my route to the coffee machine.",
  "Tree-shaking unused modules... and the office plants.",
  "Negotiating with the Zone.js monkeys...",
  "Trying to remember if this is AngularJS or just Angular...",
  "Injecting dependencies... Hold still, this won't hurt a bit.",
  "Just transpiling some TypeScript. It's like regular JavaScript, but with a tie.",
  "I'm not slow, I'm just single-threaded.",
  "Hold on, I'm debugging my life choices... and this component.",
  "If you think this is slow, you should see my webpack config.",
  "Don't worry, I've cached your patience... somewhere.",
  "This is taking longer than a `git merge` conflict resolution.",
  "I'm not stuck, I'm just admiring the elegance of the loading spinner.",
  "I'm sure your component will render... eventually.",
  "I'm not just loading, I'm achieving a state of zen-like tranquility.",
  "The good news is, your app is becoming self-aware. The bad news is, it's a teenager.",
  "I'm not saying it's aliens, but... it's aliens.",
  "I'm not procrastinating, I'm just waiting for the right moment to render.",
  "I'm not a magician, but I'm about to pull a UI out of a hat.",
  "I'm not just a pretty face, I'm also a loading spinner.",
  "I'm not just a loading spinner, I'm a metaphor for the human condition.",
  "I'm not just a metaphor for the human condition, I'm also a pretty face.",
  "I'm not just a pretty face, I'm also a loading spinner... wait, I said that already.",
  "Warming up the virtual DOM... almost there!",
  "Crafting pixels with care, one frame at a time.",
  "Assembling the perfect user experience, piece by piece.",
  "Just a moment while we fetch the latest web wisdom.",
  "Polishing the UI to a brilliant shine.",
  "Brewing a fresh cup of JavaScript... almost ready!",
  "Connecting the dots in the vast web of knowledge.",
  "Unpacking the bundle of joy (and code).",
  "Preparing your personalized Angular insights.",
  "Making sure all your directives are in order.",
  "Just a few more cycles until perfection.",
  "Gathering all the bits and bytes for your viewing pleasure.",
  "Almost ready to serve up some fresh front-end goodness.",
  "We're working hard to make your web dreams a reality.",
  "Your patience is appreciated, and your experience is our priority.",
];

export const GENERATED_APP_CONTEXT = {
  appName: 'Angular Docs',
  theme: 'adev-docs',
  welcomeText: 'Welcome! How can I help you with your Angular questions today?',
  placeholders: LOADING_TEXT,
  appDescription: GENERATED_APP_DESCRIPTION,
  componentMap: GENERATED_COMPONENT_MAP,
  componentContextData: GENERATED_COMPONENT_CONTEXT_DATA
};
