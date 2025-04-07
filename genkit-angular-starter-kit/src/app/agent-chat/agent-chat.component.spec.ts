/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChatComponent } from './agent-chat.component';

describe('AgentChatComponent', () => {
  let component: AgentChatComponent;
  let fixture: ComponentFixture<AgentChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
