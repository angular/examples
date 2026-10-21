import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { mergeApplicationConfig } from '@angular/core';
import { MCP_UI_INITITAL_RENDER_DATA } from './app/tools/mcp';

const widgetId = document.body.dataset['widgetId'];
if (widgetId) {
  const eventualRenderData = new Promise<unknown>((resolve) => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'ui-lifecycle-iframe-render-data') {
        const customRenderData = event.data.payload.renderData;
        // Now you can render the UI with the received data
        resolve(new Map<string, unknown>([[widgetId, customRenderData]]));
      }
    });
  });

  switch (widgetId) {
    case 'angles-widget':
      Promise.all([import('./app/tools/angles/angles-widget'), eventualRenderData]).then(
        ([{ AnglesWidget }, renderData]) => {
          bootstrapApplication(
            AnglesWidget,
            mergeApplicationConfig(appConfig, {
              providers: [{ provide: MCP_UI_INITITAL_RENDER_DATA, useValue: renderData }],
            })
          ).catch((err) => console.error(err));
        }
      );
      break;

    default:
      throw new Error(`Unknown widget ID: ${widgetId}`);
  }

  // We can let the parent know we're ready to receive data
  window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      window.parent.postMessage(
        {
          type: 'ui-size-change',
          payload: {
            height: entry.contentRect.height,
          },
        },
        '*'
      );
    });
  });

  resizeObserver.observe(document.documentElement);
} else {
  // Define the ui-resource-renderer web component.
  (async () => {
    // @ts-expect-error: Module has no types.
    await import('@mcp-ui/client/ui-resource-renderer.wc.js');
    bootstrapApplication(App, appConfig);
  })().catch((err) => console.error(err));
}
