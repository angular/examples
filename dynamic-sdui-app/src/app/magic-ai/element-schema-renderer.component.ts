/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicElementSchema } from './magic-ai-service';
import { MagicAiRenderer } from './magic-ai-renderer.component';

@Directive({
  selector: '[dynamicAttributes]',
  standalone: true,
})
export class DynamicAttributesDirective {
  dynamicAttributes = input<{[key: string]: string} | undefined>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    effect(() => {
      this.updateAttributes();
    });
  }

  private updateAttributes(): void {
    const attributes = this.dynamicAttributes();
    if (attributes) {
      // Clear previous attributes to handle removals
      // A more sophisticated approach might be needed if the element has other static attributes
      this.elementRef.nativeElement.getAttributeNames().forEach((attr: string) => {
        if (attr !== 'ng-version' && !attributes.hasOwnProperty(attr)) {
           this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
        }
      });

      for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          this.renderer.setAttribute(
            this.elementRef.nativeElement,
            key,
            attributes[key],
          );
        }
      }
    }
  }
}

@Component({
  selector: 'element-schema-renderer',
  standalone: true,
  imports: [CommonModule, DynamicAttributesDirective, forwardRef(() => MagicAiRenderer)],
  template: `
    <ng-template #childrenRenderer>
      @for (child of schema().children; track $index) {
        <magic-ai-renderer [schema]="child" />
      }
    </ng-template>

    @switch (schema().element) {
      @case('main') { <main [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></main> }
      @case('aside') { <aside [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></aside> }
      @case('header') { <header [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></header> }
      @case('div') { <div [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></div> }
      @case('span') { <span [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></span> }
      @case('nav') { <nav [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></nav> }
      @case('section') { <section [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></section> }
      @case('article') { <article [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></article> }
      @case('h1') { <h1 [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></h1> }
      @case('h2') { <h2 [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></h2> }
      @case('h3') { <h3 [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></h3> }
      @case('h4') { <h4 [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></h4> }
      @case('p') { <p [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></p> }
      @case('a') { <a [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></a> }
      @case('ul') { <ul [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></ul> }
      @case('ol') { <ol [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></ol> }
      @case('li') { <li [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></li> }
      @case('b') { <b [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></b> }
      @case('em') { <em [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></em> }
      @case('button') { <button [dynamicAttributes]="schema().attributes"><ng-container *ngTemplateOutlet="childrenRenderer" /></button> }
      @case('img') { <img [dynamicAttributes]="schema().attributes" /> }
      @default { <br/> }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementSchemaRenderer {
  schema = input.required<DynamicElementSchema>();
}
