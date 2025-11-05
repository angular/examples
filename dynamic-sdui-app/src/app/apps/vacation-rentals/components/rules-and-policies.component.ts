/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type Rule = {
  text: string;
  allowed: boolean;
};

export type Policy = {
  title: string;
  content: string;
};

@Component({
  selector: 'app-rules-and-policies',
  standalone: true,
  imports: [],
  template: `<div class="container">
  <h2>Things to know</h2>
  <div class="grid">
    <!-- House Rules -->
    <div class="section">
      <h3>House rules</h3>
      <div class="list">
        @for (rule of rules(); track rule.text) {
          <div class="list-item">
            @if (rule.allowed) {
              <span class="material-icons icon-check">check</span>
            } @else {
              <span class="material-icons icon-close">close</span>
            }
            <span>{{ rule.text }}</span>
          </div>
        }
      </div>
    </div>

    <!-- Other Policies -->
    @if (policies(); as policyList) {
      <div class="section">
        <h3>Also note</h3>
        <div class="list">
          @for (policy of policyList; track policy.title) {
            <div class="list-item policy">
              <strong>{{ policy.title }}:</strong>
              <span>{{ policy.content }}</span>
            </div>
          }
        </div>
      </div>
    }
  </div>
</div>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  padding: var(--haven-spacing-5, 32px) 0;
  border-bottom: var(--haven-border-default, 1px solid #EAEAEA);
}

h2 {
  font-size: var(--haven-text-xl, 24px);
  font-weight: var(--haven-font-weight-semibold, 600);
  color: var(--haven-text-primary, #222222);
  margin: 0 0 var(--haven-spacing-4, 24px) 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--haven-spacing-5, 32px);
}

.section h3 {
  font-size: var(--haven-text-lg, 18px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin: 0 0 var(--haven-spacing-3, 16px) 0;
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-3, 16px);
}

.list-item {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-3, 16px);
  font-size: var(--haven-text-base, 16px);
  color: var(--haven-text-secondary, #555555);
}

.list-item.policy {
  align-items: flex-start;
}

.list-item .material-icons {
  font-size: 24px;
  color: var(--haven-text-primary, #222222);
}

.icon-close {
  color: var(--haven-error, #dc3545);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesAndPoliciesComponent {
  rules = input<Rule[]>([]);
  policies = input<Policy[]>();
}
