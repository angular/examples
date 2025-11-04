/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Type } from '@angular/core';
import { GENERATED_APP_CONTEXT as ADEV_APP_CONTEXT } from '../apps/adev-docs/app-context';
import { GENERATED_APP_CONTEXT as VACATION_APP_CONTEXT } from '../apps/vacation-rentals/app-context';
import { GENERATED_APP_CONTEXT as MAGIC_BOOKSTORE_APP_CONTEXT } from '../apps/magic-bookstore/app-context';

export interface ComponentContext {
  name: string;
  description: string;
  type: 'dynamicComponent';
  inputs: { [key: string]: Input; }
}

export interface Input {
  type: string;
  description: string;
  required?: boolean;
}

export interface AppContext {
  appName: string;
  theme: string;
  welcomeText: string;
  placeholders: string[];
  appDescription: string;
  componentMap: { [key: string]: Type<any> };
  componentContextData: ComponentContext[];
}

const ADEV_DOCS: AppName = 'adev-docs';
const VACATION_RENTALS: AppName = 'vacation-rentals';
const MAGIC_BOOKSTORE: AppName = 'magic-bookstore';

type AppName = 
    'adev-docs' |
    'vacation-rentals' |
    'magic-bookstore';
const APP_CONTEXT_MAP: { [key: string]: AppContext } = {
  [ADEV_DOCS]: ADEV_APP_CONTEXT,
  [VACATION_RENTALS]: VACATION_APP_CONTEXT,
  [MAGIC_BOOKSTORE]: MAGIC_BOOKSTORE_APP_CONTEXT,
};


export const APP_NAME: AppName = ADEV_DOCS;

export const APP_CONTEXT = APP_CONTEXT_MAP[APP_NAME];