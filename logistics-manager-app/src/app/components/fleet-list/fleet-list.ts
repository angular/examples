import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FleetService, FleetUnit } from '../../services/fleet.service';
import { FleetDetailModal } from '../fleet-detail-modal/fleet-detail-modal';

@Component({
  selector: 'app-fleet-list',
  imports: [DecimalPipe, FleetDetailModal],
  template: `
    <div class="p-8 bg-surface text-on-surface flex-1 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <header class="mb-8 flex justify-between items-end">
          <div>
            <h1 class="text-3xl font-black tracking-tighter text-primary mb-2 uppercase">Fleet Inventory</h1>
            <p class="text-on-surface-variant font-label text-[0.65rem] tracking-widest uppercase">
              Total Active Units: {{ fleetService.units().length }}
            </p>
          </div>
          <div class="flex gap-4">
            <div class="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex flex-col min-w-[120px]">
              <span class="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Operational</span>
              <span class="text-xl font-black text-primary">{{ getUnitsByStatus('EN ROUTE').length + getUnitsByStatus('TRANSIT').length }}</span>
            </div>
            <div class="bg-surface-container border border-outline-variant/30 rounded-lg p-4 flex flex-col min-w-[120px]">
              <span class="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Critical</span>
              <span class="text-xl font-black text-error">{{ getUnitsByStatus('CRITICAL').length + getUnitsByStatus('REPAIR').length }}</span>
            </div>
          </div>
        </header>

        <!-- Filter Bar -->
        <div class="flex items-center gap-4 mb-6">
          <select [value]="statusFilter()"
                  (change)="statusFilter.set($any($event.target).value)" 
                  class="bg-surface-container border border-outline-variant/30 text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer">
            <option value="">All Statuses</option>
            <option value="EN ROUTE">En Route</option>
            <option value="TRANSIT">Transit</option>
            <option value="DOCKING">Docking</option>
            <option value="CHARGING">Charging</option>
            <option value="CRITICAL">Critical</option>
            <option value="WARNING">Warning</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>

          <select [value]="batteryFilter()"
                  (change)="batteryFilter.set($any($event.target).value)" 
                  class="bg-surface-container border border-outline-variant/30 text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer">
            <option value="">All Battery Levels</option>
            <option value="critical">&lt; 20% (Critical)</option>
            <option value="low">&lt; 50% (Low)</option>
            <option value="good">&gt;= 50% (Good)</option>
          </select>

          <select [value]="serviceFilter()"
                  (change)="serviceFilter.set($any($event.target).value)" 
                  class="bg-surface-container border border-outline-variant/30 text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer">
            <option value="">All Service States</option>
            <option value="needs-service">Needs Service</option>
            <option value="ok">OK</option>
          </select>

          @if (hasActiveFilters()) {
            <button (click)="resetFilters()" 
                    class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/10 rounded-lg transition-colors">
              <span class="material-symbols-outlined text-lg">restart_alt</span>
              Reset Filters
            </button>
          }
        </div>

        <div class="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl transition-colors">
          <table class="w-full text-left border-collapse">
            <thead class="bg-surface-container-high border-b border-outline-variant/30">
              <tr>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Unit ID</th>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Status</th>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Location (Lat/Lng)</th>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Speed</th>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase">Battery</th>
                <th class="px-6 py-4 text-[0.6rem] font-black text-primary tracking-widest uppercase text-right">Service</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/10">
              @for (unit of filteredUnits(); track unit.id) {
                <tr class="hover:bg-primary/5 transition-colors group cursor-pointer"
                    (click)="selectUnit(unit)">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 rounded-full" [class]="getStatusColor(unit.status)"></div>
                      <span class="text-xs font-bold font-mono text-on-surface group-hover:text-primary transition-colors hover:underline decoration-primary/30 decoration-2 underline-offset-4">{{ unit.id }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-[0.6rem] font-bold px-2 py-1 rounded border border-outline-variant/30 uppercase tracking-widest" 
                          [class]="getStatusBadgeClass(unit.status)">
                      {{ unit.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="text-[0.65rem] font-medium text-on-surface-variant font-mono">
                      {{ unit.lat | number:'1.4-4' }}, {{ unit.lng | number:'1.4-4' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-xs font-bold text-on-surface">{{ unit.speed }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden max-w-[60px]">
                        <div class="h-full rounded-full transition-all duration-500" 
                             [style.width]="unit.battery"
                             [class]="getBatteryColor(unit.battery)"></div>
                      </div>
                      <span class="text-[0.65rem] font-bold text-on-surface-variant">{{ unit.battery }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    @if (unit.needsService) {
                      <span class="material-symbols-outlined text-error text-lg animate-pulse">warning</span>
                    } @else {
                      <span class="material-symbols-outlined text-primary/30 text-lg">check_circle</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      
      @if (selectedUnit(); as unit) {
        <app-fleet-detail-modal [unit]="unit" (close)="selectedUnit.set(null)" />
      }
    </div>
  `,
  host: {
    'class': 'flex flex-col flex-1 overflow-hidden'
  }
})
export class FleetList {
  fleetService = inject(FleetService);

  statusFilter = signal<string>('');
  batteryFilter = signal<string>('');
  serviceFilter = signal<string>('');
  
  selectedUnit = signal<FleetUnit | null>(null);

  hasActiveFilters = computed(() => {
    return !!(this.statusFilter() || this.batteryFilter() || this.serviceFilter());
  });

  filteredUnits = computed(() => {
    const units = this.fleetService.units();
    const status = this.statusFilter();
    const battery = this.batteryFilter();
    const service = this.serviceFilter();

    return units.filter(unit => {
      let matches = true;

      if (status && unit.status !== status) {
        matches = false;
      }

      if (battery) {
        const batteryVal = parseFloat(unit.battery);
        if (battery === 'critical' && batteryVal >= 20) matches = false;
        if (battery === 'low' && batteryVal >= 50) matches = false;
        if (battery === 'good' && batteryVal < 50) matches = false;
      }

      if (service) {
        if (service === 'needs-service' && !unit.needsService) matches = false;
        if (service === 'ok' && unit.needsService) matches = false;
      }

      return matches;
    });
  });

  resetFilters() {
    this.statusFilter.set('');
    this.batteryFilter.set('');
    this.serviceFilter.set('');
  }

  getUnitsByStatus(status: string) {
    return this.fleetService.units().filter(u => u.status === status);
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'EN ROUTE': case 'TRANSIT': return 'bg-primary';
      case 'DOCKING': case 'CHARGING': return 'bg-secondary';
      case 'CRITICAL': case 'REPAIR': case 'WARNING': return 'bg-error';
      default: return 'bg-on-surface-variant';
    }
  }

  getStatusBadgeClass(status: string) {
    switch (status) {
      case 'EN ROUTE': case 'TRANSIT': return 'bg-primary/10 text-primary border-primary/20';
      case 'DOCKING': case 'CHARGING': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'CRITICAL': case 'REPAIR': case 'WARNING': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-surface-container-highest text-on-surface-variant';
    }
  }

  getBatteryColor(battery: string) {
    const val = parseFloat(battery);
    if (val < 20) return 'bg-error';
    if (val < 50) return 'bg-warning text-warning'; // Assuming warning utility if available
    return 'bg-primary';
  }

  selectUnit(unit: FleetUnit) {
    this.selectedUnit.set(unit);
    this.fleetService.setActiveUnit(unit.id);
  }
}
