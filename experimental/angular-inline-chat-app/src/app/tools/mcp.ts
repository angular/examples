import { inject, InjectionToken } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import z from 'zod';

export const MCP_CLIENT = new InjectionToken<Client>('MCP.Client', {
  // TODO: Connect more directly to the tools during SSR.
  factory: () => {
    const location = inject(PlatformLocation);
    const mcpUrl = new URL('/mcp', location.href);
    const transport = new StreamableHTTPClientTransport(mcpUrl);
    const client = new Client({
      name: 'streamable-http-client',
      version: '1.0.0',
    });
    client.connect(transport);
    return client;
  },
});

export const MCP_UI_INITITAL_RENDER_DATA = new InjectionToken<Map<string, unknown>>(
  'MCP.UI.InitialRenderData',
  {
    factory: () => new Map<string, unknown>(),
  }
);

export function injectRenderDataForWidget<T>(widgetId: string, schema: z.ZodSchema<T>): T | null {
  const renderDataMap = inject(MCP_UI_INITITAL_RENDER_DATA);
  const rawData = renderDataMap.get(widgetId);
  if (!rawData) {
    return null;
  }
  const data = schema.safeParse(rawData);
  return data.success ? data.data : null;
}
