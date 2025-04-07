/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { TestBed } from '@angular/core/testing';

import { AgentService } from './agent.service';

describe('AgentService', () => {
  let service: AgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
