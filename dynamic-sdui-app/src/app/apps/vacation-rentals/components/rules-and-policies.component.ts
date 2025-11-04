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
  templateUrl: './rules-and-policies.component.html',
  styleUrls: ['./rules-and-policies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesAndPoliciesComponent {
  rules = input<Rule[]>([]);
  policies = input<Policy[]>();
}
