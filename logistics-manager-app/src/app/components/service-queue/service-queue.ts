import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { form, FormField, submit, required } from '@angular/forms/signals';
import { Tab, Tabs, TabList, TabPanel, TabContent } from '@angular/aria/tabs';
import { FleetService } from '../../services/fleet.service';
import { ServiceTicket } from '../../../fleet-db';

@Component({
  selector: 'app-service-queue',
  imports: [DatePipe, FormField, Tab, Tabs, TabList, TabPanel, TabContent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 bg-surface text-on-surface h-full overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <header class="mb-8 flex justify-between items-end">
          <div>
            <h1 class="text-3xl font-black tracking-tighter text-primary mb-2 uppercase">Service Queue</h1>
            <p class="text-on-surface-variant font-label text-[0.65rem] tracking-widest uppercase">
              Total Open Tickets: {{ activeTickets().length }}
            </p>
          </div>
          <button (click)="openRequestModal()" class="px-5 py-2.5 bg-primary text-on-primary font-bold rounded-lg uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            Request Service
          </button>
        </header>

        <div ngTabs>
          <ul ngTabList class="flex border-b border-outline-variant/30 mb-6" [selectedTab]="selectedTab()" (selectedTabChange)="selectedTab.set($event)">
            <li ngTab value="active" 
                class="px-6 py-3 text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant border-b-2 border-transparent transition-all cursor-pointer aria-selected:text-primary aria-selected:border-primary aria-selected:bg-primary/5">
              Active Tickets
            </li>
            <li ngTab value="resolved" 
                class="px-6 py-3 text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant border-b-2 border-transparent transition-all cursor-pointer aria-selected:text-primary aria-selected:border-primary aria-selected:bg-primary/5">
              Resolved
            </li>
          </ul>

          <div ngTabPanel value="active">
            <ng-template ngTabContent>
              <div class="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl transition-colors">
                <ng-container *ngTemplateOutlet="ticketTable; context: { $implicit: activeTickets() }"></ng-container>
              </div>
            </ng-template>
          </div>

          <div ngTabPanel value="resolved">
            <ng-template ngTabContent>
              <div class="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl transition-colors">
                <ng-container *ngTemplateOutlet="ticketTable; context: { $implicit: resolvedTickets() }"></ng-container>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>

    <ng-template #ticketTable let-tickets>
      <table class="w-full text-left border-collapse">
        <thead class="bg-surface-container-high border-b border-outline-variant/30">
          <tr>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Ticket ID</th>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Unit ID</th>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Priority</th>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Status</th>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Issue</th>
            <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase text-right">Reported At</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant/10">
          @for (ticket of tickets; track ticket.id) {
            <tr (click)="openDetailModal(ticket)" class="hover:bg-primary/5 transition-colors group cursor-pointer">
              <td class="px-6 py-4">
                <span class="text-xs font-bold font-mono text-on-surface group-hover:text-primary transition-colors">{{ ticket.id }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-bold font-mono text-on-surface-variant">{{ ticket.unitId }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-[0.6rem] font-bold px-2 py-1 rounded border border-outline-variant/30 uppercase tracking-widest" 
                      [class]="getPriorityBadgeClass(ticket.priority)">
                  {{ ticket.priority }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="text-[0.65rem] font-medium text-on-surface-variant tracking-widest uppercase">
                  {{ ticket.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-6 py-4 text-xs font-medium text-on-surface max-w-xs truncate" [title]="ticket.issue">
                {{ ticket.issue }}
              </td>
              <td class="px-6 py-4 text-right text-[0.65rem] font-medium text-on-surface-variant font-mono">
                {{ ticket.reportedAt | date:'short' }}
              </td>
            </tr>
          }
          @if (tickets.length === 0) {
            <tr>
              <td colspan="6" class="px-6 py-8 text-center text-sm text-on-surface-variant">No tickets found in this category.</td>
            </tr>
          }
        </tbody>
      </table>
    </ng-template>

    <!-- Request Modal -->
    @if (isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-surface-container border border-outline-variant/30 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
          <header class="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-high">
            <h2 class="text-lg font-black tracking-tighter text-primary uppercase">Request Service</h2>
            <button type="button" (click)="closeRequestModal()" class="text-on-surface-variant hover:text-error transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </header>
          
          <form (submit)="onSubmit(); $event.preventDefault()" class="p-6 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-primary uppercase tracking-widest">Select Vehicle</label>
              <select [formField]="serviceForm.unitId" class="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:ring-primary focus:border-primary outline-none cursor-pointer">
                <option value="" disabled selected>Choose a unit...</option>
                @for (unit of fleetService.units(); track unit.id) {
                  <option [value]="unit.id">{{ unit.id }} - {{ unit.status }}</option>
                }
              </select>
              @if (serviceForm.unitId().touched() && serviceForm.unitId().errors().length) {
                <span class="text-xs text-error font-bold tracking-widest uppercase">Vehicle is required.</span>
              }
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-primary uppercase tracking-widest">Problem Description</label>
              <textarea [formField]="serviceForm.issue" rows="4" placeholder="Describe the issue..." class="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:ring-primary focus:border-primary outline-none resize-none"></textarea>
              @if (serviceForm.issue().touched() && serviceForm.issue().errors().length) {
                <span class="text-xs text-error font-bold tracking-widest uppercase">Description is required.</span>
              }
            </div>

            <div class="flex justify-end gap-3 mt-2">
              <button type="button" (click)="closeRequestModal()" class="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors uppercase tracking-widest">
                Cancel
              </button>
              <button type="submit" [disabled]="isSubmitting() || serviceForm().invalid()" class="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest">
                {{ isSubmitting() ? 'Submitting...' : 'Submit Request' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Detail/Edit Modal -->
    @if (selectedTicket()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-surface-container border border-outline-variant/30 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
          <header class="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-high">
            <h2 class="text-lg font-black tracking-tighter text-primary uppercase">Ticket Details: {{ selectedTicket()?.id }}</h2>
            <button type="button" (click)="closeDetailModal()" class="text-on-surface-variant hover:text-error transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </header>
          
          <form (submit)="onEditSubmit(); $event.preventDefault()" class="p-6 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-primary uppercase tracking-widest">Unit ID</label>
              <select [formField]="editForm.unitId" class="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:ring-primary focus:border-primary outline-none cursor-pointer">
                @for (unit of fleetService.units(); track unit.id) {
                  <option [value]="unit.id">{{ unit.id }}</option>
                }
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-primary uppercase tracking-widest">Priority</label>
              <select [formField]="editForm.priority" class="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:ring-primary focus:border-primary outline-none cursor-pointer">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-primary uppercase tracking-widest">Problem Description</label>
              <textarea [formField]="editForm.issue" rows="4" class="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-sm text-on-surface focus:ring-primary focus:border-primary outline-none resize-none"></textarea>
              @if (editForm.issue().touched() && editForm.issue().errors().length) {
                <span class="text-xs text-error font-bold tracking-widest uppercase">Description is required.</span>
              }
            </div>

            <div class="flex flex-col gap-4 mt-2">
              <div class="flex justify-between items-center">
                <div class="flex gap-2">
                  <button type="button" (click)="closeDetailModal()" class="px-3 py-1.5 text-xs font-bold text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors uppercase tracking-widest">
                    Cancel
                  </button>
                  <button type="submit" [disabled]="isSubmitting() || editForm().invalid()" class="px-3 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 uppercase tracking-widest">
                    {{ isSubmitting() ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
                <button type="button" 
                        (click)="resolveTicket()" 
                        [disabled]="isSubmitting() || selectedTicket()?.status === 'RESOLVED'"
                        class="px-3 py-1.5 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 uppercase tracking-widest">
                  Mark as Resolved
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  host: {
    'class': 'flex flex-col flex-1 overflow-hidden'
  }
})
export class ServiceQueue {
  fleetService = inject(FleetService);

  isModalOpen = signal(false);
  isSubmitting = signal(false);
  selectedTicket = signal<ServiceTicket | null>(null);
  selectedTab = signal<string | undefined>('active');

  activeTickets = computed(() => this.fleetService.serviceQueue().filter(t => t.status !== 'RESOLVED'));
  resolvedTickets = computed(() => this.fleetService.serviceQueue().filter(t => t.status === 'RESOLVED'));

  serviceModel = signal({
    unitId: '',
    issue: ''
  });

  serviceForm = form(this.serviceModel, (s) => {
    required(s.unitId, { message: 'Vehicle is required' });
    required(s.issue, { message: 'Description is required' });
  });

  editModel = signal({
    unitId: '',
    issue: '',
    priority: 'LOW' as ServiceTicket['priority']
  });

  editForm = form(this.editModel, (s) => {
    required(s.unitId, { message: 'Vehicle is required' });
    required(s.issue, { message: 'Description is required' });
    required(s.priority, { message: 'Priority is required' });
  });

  getPriorityBadgeClass(priority: string) {
    switch (priority) {
      case 'CRITICAL': return 'bg-error/10 text-error border-error/20';
      case 'HIGH': return 'bg-warning/10 text-warning border-warning/20';
      case 'MEDIUM': return 'bg-primary/10 text-primary border-primary/20';
      case 'LOW': return 'bg-surface-container-highest text-on-surface-variant border-outline-variant/30';
      default: return 'bg-surface-container-highest text-on-surface-variant';
    }
  }

  openRequestModal() {
    this.serviceModel.set({ unitId: '', issue: '' });
    this.serviceForm().reset();
    this.isModalOpen.set(true);
  }

  closeRequestModal() {
    this.isModalOpen.set(false);
  }

  onSubmit() {
    this.isSubmitting.set(true);
    submit(this.serviceForm, async () => {
      try {
        const data = this.serviceModel();
        await this.fleetService.addServiceTicket(data.unitId, data.issue);
        this.closeRequestModal();
      } finally {
        this.isSubmitting.set(false);
      }
    });
  }

  openDetailModal(ticket: ServiceTicket) {
    this.selectedTicket.set(ticket);
    this.editModel.set({
      unitId: ticket.unitId,
      issue: ticket.issue,
      priority: ticket.priority
    });
    this.editForm().reset();
  }

  closeDetailModal() {
    this.selectedTicket.set(null);
  }

  onEditSubmit() {
    const ticket = this.selectedTicket();
    if (!ticket) return;

    this.isSubmitting.set(true);
    submit(this.editForm, async () => {
      try {
        await this.fleetService.updateServiceTicket(ticket.id, this.editModel());
        this.closeDetailModal();
      } finally {
        this.isSubmitting.set(false);
      }
    });
  }

  async resolveTicket() {
    const ticket = this.selectedTicket();
    if (!ticket) return;

    this.isSubmitting.set(true);
    try {
      await this.fleetService.updateServiceTicket(ticket.id, { status: 'RESOLVED' });
      this.closeDetailModal();
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
