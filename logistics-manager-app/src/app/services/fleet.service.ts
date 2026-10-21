import { Injectable, signal, computed, effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ServiceTicket } from '../../fleet-db';

export interface FleetUnit {
  id: string;
  lat: number;
  lng: number;
  status: string;
  speed: string;
  battery: string;
  needsService: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  // Use httpResource to fetch fleet data from the Express backend
  readonly unitsResource = httpResource<FleetUnit[]>(() => '/api/fleet');
  readonly serviceQueueResource = httpResource<ServiceTicket[]>(() => '/api/service-queue');
  
  // Expose the value or an empty array if loading/error
  readonly units = computed(() => this.unitsResource.value() ?? []);
  readonly serviceQueue = computed(() => this.serviceQueueResource.value() ?? []);

  readonly activeUnitId = signal<string | null>(null);
  readonly isDarkMode = signal(true);
  readonly isChatOpen = signal(false);
  
  readonly fleetWithActiveState = computed(() => {
    const activeId = this.activeUnitId();
    return this.units().map(u => ({ ...u, active: u.id === activeId }));
  });

  constructor() {
    // Sync the .dark class with the signal state
    effect(() => {
      if (typeof document === 'undefined') return;
      const isDark = this.isDarkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    // Initialize from DOM if available
    if (typeof document !== 'undefined') {
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));
    }
  }

  setActiveUnit(id: string) {
    this.activeUnitId.set(id);
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  toggleChat() {
    this.isChatOpen.update(open => !open);
  }

  async addServiceTicket(unitId: string, issue: string) {
    const ticket = {
      unitId,
      issue,
      priority: 'MEDIUM',
      status: 'OPEN',
      reportedAt: new Date().toISOString()
    };
    
    await fetch('/api/service-queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket)
    });
    
    this.serviceQueueResource.reload();
  }

  async updateServiceTicket(id: string, update: Partial<ServiceTicket>) {
    await fetch(`/api/service-queue/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    
    this.serviceQueueResource.reload();
  }
}
