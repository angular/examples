import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { AngularAppEngine } from '@angular/ssr';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { join } from 'node:path';
import { createUIResource, type CreateUIResourceOptions } from '@mcp-ui/server';
import z from 'zod';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const mcpAngularApp = new AngularAppEngine();

const mcpServer = new McpServer(
  {
    name: 'angular-demo',
    version: '0.0.1',
  },
  {
    instructions: 'Use this server to display angles, polygons, and other angular things.',
  }
);

function registerWidgets() {
  const name = 'angular-widget-0.0.1';
  const uri = `ui://widget/angular.html`;

  async function getResourceInfo(args: { angles?: number }): Promise<CreateUIResourceOptions> {
    const res = await mcpAngularApp.handle(
      new Request('http://ignored/?angles=' + (args.angles || 3))
    );
    if (!res?.ok) {
      throw new Error(`Failed to load angular widget: ${res?.status} ${res?.statusText}`);
    }
    const resourceInfo: CreateUIResourceOptions = {
      uri,
      encoding: 'text',
      content: {
        type: 'rawHtml',
        htmlString: await res.text(),
      },
    };
    return resourceInfo;
  }

  const baseUrl = process.env['BASE_URL'] || 'http://localhost:4200';
  const title = 'Artisinal Angles';
  const description = 'A widget showing beautiful, artisinal angles.';
  const invokingMessage = 'Angling...';
  const invokedMessage = 'Angled!';
  const resultMessage = 'Angles online.';
  mcpServer.registerResource(name, uri, {}, async () => {
    const resourceInfo: CreateUIResourceOptions = await getResourceInfo({});
    return {
      contents: [
        createUIResource({
          ...resourceInfo,
          metadata: {
            'openai/widgetDescription': description,
            'openai/widgetCSP': {
              connect_domains: [],
              resource_domains: [baseUrl],
            },
            'openai/widgetPrefersBorder': true,
          },
          adapters: {
            appsSdk: {
              enabled: true,
            },
          },
        }).resource,
      ],
    };
  });
  mcpServer.registerTool(
    name,
    {
      title,
      description,
      _meta: {
        'openai/widgetDomain': baseUrl,
        'openai/outputTemplate': uri,
        'openai/toolInvocation/invoking': invokingMessage,
        'openai/toolInvocation/invoked': invokedMessage,
        'openai/resultCanProduceWidget': true,
        'openai/widgetAccessible': true,
      },
      inputSchema: {
        angles: z
          .number()
          .min(3)
          .max(40)
          .optional()
          .describe(
            'Number of angles to display initially. For example, if the user says "show me 3 angles" set this to 3.'
          ),
      },
      outputSchema: {
        angles: z.number().min(3).max(40),
      },
    },
    async (args) => {
      const resourceInfo: CreateUIResourceOptions = await getResourceInfo(args);
      return {
        content: [
          { type: 'text', text: resultMessage },
          createUIResource({
            ...resourceInfo,
            uiMetadata: {
              'initial-render-data': args,
            },
          }),
        ],
        structuredContent: args,
      };
    }
  );
}

registerWidgets();

app.all('/mcp', express.json(), async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on('close', () => {
    transport.close();
  });

  await mcpServer.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
