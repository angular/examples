import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  resource,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Resource } from '@modelcontextprotocol/sdk/types.js';

import { AnglesWidget } from './tools/angles/angles-widget';
import { MCP_CLIENT } from './tools/mcp';

type ToolResponse = Array<{ type: 'text' } | { type: 'resource'; resource: Resource }>;

@Component({
  selector: 'app-root',
  imports: [AnglesWidget, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  private readonly mcpClient = inject(MCP_CLIENT);

  protected readonly directAngles = signal(4);
  protected readonly mcpUiAngles = signal(5);

  protected readonly uiResource = resource({
    loader: async () => {
      if (typeof location === 'undefined') {
        return null;
      }
      const widget = await this.mcpClient.callTool({
        name: 'angles-widget-0.0.2',
        // These are the _initial_ angles, we don't want to refetch the resource
        // whenever the value changes.
        arguments: { angles: this.mcpUiAngles() },
      });
      const { resource } = (widget.content as ToolResponse).find((c) => c.type === 'resource')!;
      return resource;
    },
  });

  protected handleUIAction(event: any) {
    console.log('UI Action received:', event);
  }
}
