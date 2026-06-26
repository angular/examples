import { Component, computed, effect, model } from '@angular/core';
import z from 'zod';
import { injectRenderDataForWidget } from '../mcp';

const DEFAULT_ANGLES = 3;

const renderDataSchema = z.object({
  angles: z.number().min(3).max(40),
});

interface OpenAiWidgetInterface {
  setWidgetState: (state: unknown) => Promise<void>;
}

declare var openai: OpenAiWidgetInterface | undefined;

@Component({
  selector: 'angles-widget',
  templateUrl: './angles-widget.html',
  styleUrl: './angles-widget.css',
})
export class AnglesWidget {
  private readonly renderData = injectRenderDataForWidget('angles-widget', renderDataSchema);

  readonly angles = model(this.renderData?.angles ?? DEFAULT_ANGLES);

  constructor() {
    this.syncAnglesToRenderData();
  }

  private syncAnglesToRenderData() {
    if (typeof window === 'undefined' || typeof openai === 'undefined' || !openai) {
      return;
    }

    const widgetInterface = openai;

    // TODO: Check if we're embedded in an MCP UI context.
    effect(() => {
      const angles = this.angles();
      widgetInterface.setWidgetState({ angles });
    });
  }

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
