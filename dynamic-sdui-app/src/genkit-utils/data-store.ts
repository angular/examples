/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { APP_NAME } from '../app/magic-ai/app-context';
import { DATA as ADEV_DATA } from '../app/apps/adev-docs/data-store';
import { DATA as VACATION_DATA } from '../app/apps/vacation-rentals/data-store';
import { DATA as MAGIC_BOOKSTORE_DATA } from '../app/apps/magic-bookstore/data-store';

const DATA_MAP = {
  'adev-docs': ADEV_DATA,
  'vacation-rentals': JSON.stringify(VACATION_DATA, null, 2),
  'magic-bookstore': JSON.stringify(MAGIC_BOOKSTORE_DATA, null, 2),
};

export const DATA = DATA_MAP[APP_NAME];
