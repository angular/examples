import { Component, ElementRef, ViewChild, effect, afterNextRender, inject } from '@angular/core';
import type * as LType from 'leaflet';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-map',
  imports: [],
  host: {
    'class': 'flex-1 relative bg-surface-container-low flex'
  },
  template: `
    <main class="flex-1 relative w-full h-full" #mapContainer></main>
  `
})
export class Map {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLElement>;

  private map: LType.Map | undefined;
  private tileLayer: LType.TileLayer | undefined;
  private markers: { [id: string]: LType.Marker } = {};
  private L: typeof LType | undefined;
  private lastFocusedUnitId: string | null = null;

  fleetService = inject(FleetService);

  constructor() {
    afterNextRender(() => {
      import('leaflet').then((leaflet) => {
        this.L = leaflet;
        this.initMap();
        this.updateMarkers(this.fleetService.activeUnitId());
      });
    });

    effect(() => {
      const currentVehicles = this.fleetService.units();
      const activeUnitId = this.fleetService.activeUnitId();
      const isDark = this.fleetService.isDarkMode();

      if (!this.map || !this.L) return;

      this.updateTileLayer(isDark);
      this.updateMarkers(activeUnitId);

      if (activeUnitId && activeUnitId !== this.lastFocusedUnitId) {
        const activeUnit = currentVehicles.find(u => u.id === activeUnitId);
        if (activeUnit) {
          this.lastFocusedUnitId = activeUnitId;
          this.map.flyTo([activeUnit.lat, activeUnit.lng], 7, { duration: 1.2 });
        }
      }
    });
  }

  private updateTileLayer(isDark: boolean) {
    if (!this.map || !this.L) return;
    const L = this.L;

    const style = isDark ? 'dark_all' : 'voyager';
    const url = `/api/tiles/${style}/{z}/{x}/{y}{r}.png`;

    if (this.tileLayer) {
      this.tileLayer.setUrl(url);
    } else {
      this.tileLayer = L.tileLayer(url, { maxZoom: 20 }).addTo(this.map);
    }
  }

  private updateMarkers(activeUnitId: string | null = null) {
    if (!this.map || !this.L) return;
    const currentVehicles = this.fleetService.units();
    const L = this.L;

    const activeIds = new Set(currentVehicles.map(v => v.id));

    // Remove stale markers
    Object.keys(this.markers).forEach(id => {
      if (!activeIds.has(id)) {
        this.markers[id].remove();
        delete this.markers[id];
      }
    });

    // Add or update markers
    currentVehicles.forEach(vehicle => {
      const isActive = vehicle.id === activeUnitId;
      const pingClass = vehicle.needsService ? 'animate-ping bg-error/50' : 'bg-primary/20';
      const colorClass = vehicle.needsService ? 'text-error' : 'text-primary';
      const scaleClass = isActive ? 'scale-125' : '';
      const shadowClass = isActive
        ? 'ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.85)]'
        : '';
      const svgStrokeAttrs = isActive ? 'stroke="#34d399" stroke-width="1.75"' : '';

      const markerHtml = `
        <div class="relative flex items-center justify-center w-8 h-8 ${scaleClass} transition-transform duration-300">
          <div class="absolute inset-0 rounded-full ${pingClass} ${shadowClass}"></div>
          <svg class="w-6 h-6 ${colorClass} relative z-10 cursor-pointer" viewBox="0 0 24 24" fill="currentColor" ${svgStrokeAttrs}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'custom-vehicle-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      if (this.markers[vehicle.id]) {
        this.markers[vehicle.id].setLatLng([vehicle.lat, vehicle.lng]);
        this.markers[vehicle.id].setIcon(icon);
      } else {
        const marker = L.marker([vehicle.lat, vehicle.lng], { icon })
          .addTo(this.map!)
          .on('click', () => {
            this.fleetService.setActiveUnit(vehicle.id);
            // Optionally, we could update the sidebar's command terminal too by injecting Sidebar, 
            // but the clean architectural way is to have the terminal message also driven by FleetService.
            // For now, setting the active unit triggers the sidebar selection highlight!
          });
        this.markers[vehicle.id] = marker;
      }
    });
  }

  private initMap() {
    if (!this.L) return;
    const L = this.L;
    const el = this.mapContainer.nativeElement;
    this.map = L.map(el, {
      zoomControl: false,
      attributionControl: false
    }).setView([39.8283, -98.5795], 4);

    this.updateTileLayer(this.fleetService.isDarkMode());
  }
}