import { Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import z from 'zod';

const DEFAULT_ANGLES = 3;

function getInitialAngles(location: Location): number {
  const qs = new URLSearchParams(location.path().split('?')[1] || '');
  const anglesStr = qs.get('angles');
  if (anglesStr) {
    const parsed = z.number().min(3).max(40).safeParse(Number(anglesStr));
    if (parsed.success) {
      return parsed.data;
    }
    console.warn('Invalid angles query param, using default of 3: %o', parsed.error);
  }
  return DEFAULT_ANGLES;
}

@Component({
  selector: 'angles-widget',
  imports: [],
  templateUrl: './angles-widget.html',
  styleUrl: './angles-widget.css',
})
export class AnglesWidget {
  private location = inject(Location);

  protected readonly angles = signal(getInitialAngles(this.location));

  protected readonly shape = computed(() => {
    const angleCount = this.angles();
    if (angleCount < 3) {
      return '';
    }
    const angleStep = (2 * Math.PI) / angleCount;
    let path = '';
    for (let i = 0; i < angleCount; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start at the top
      const x = 52 + 40 * Math.cos(angle);
      const y = 52 + 40 * Math.sin(angle);
      const coord = `${x.toFixed(2)} ${y.toFixed(2)}`;
      if (i === 0) {
        path = `M ${coord} L`; // Move to the first point
      } else {
        path += ` ${coord}`;
      }
    }
    path += ' Z'; // Close the shape
    return path;
  });

  increaseAngles() {
    this.angles.update((n) => Math.min(n + 1, 40));
  }
}
