import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import { createUIResource, type CreateUIResourceOptions } from '@mcp-ui/server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import { ServerNotification, ServerRequest } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';
import { AnglesWidget } from './angles-widget';

import { config } from '../../app.config.server';

export function registerAnglesTool(mcpServer: McpServer) {
  const bootstrap = async (ctx: BootstrapContext) =>
    bootstrapApplication(
      AnglesWidget,
      config,
      ctx
    );

  const name = 'angles-widget-0.0.2';
  const uri = `ui://angles-widget.html`;

  async function getResourceInfo(
    args: { angles?: number },
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>
  ): Promise<CreateUIResourceOptions> {
    const hostname = `${extra.requestInfo?.headers?.['host'] || 'localhost:4200'}`;
    let origin = hostname.startsWith('localhost:') ? `http://${hostname}` : `https://${hostname}`;
    const res = await renderApplication(bootstrap, {
      url: `${origin}/?angles=${(args.angles || 3)}`,
      document: `<body data-widget-id="angles-widget"><angles-widget></angles-widget><script type="module" src="${origin}/main.js"></script></body>`,
      platformProviders: [],
    });
    const resourceInfo: CreateUIResourceOptions = {
      uri,
      encoding: 'text',
      content: {
        type: 'rawHtml',
        htmlString: res,
      },
    };
    return resourceInfo;
  }

  const baseUrl = process.env['BASE_URL'] || 'http://localhost:4200';
  const title = 'Artisinal Angles';
  const description = 'A widget showing beautiful, artisinal angles.';
  const invokingMessage = 'Folding lines...';
  const invokedMessage = 'Shape shaped!';
  const resultMessage = 'Angles online.';
  mcpServer.registerResource(name, uri, {}, async (uri, extra) => {
    const resourceInfo: CreateUIResourceOptions = await getResourceInfo({}, extra);
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
    async (args, extra) => {
      const resourceInfo: CreateUIResourceOptions = await getResourceInfo(args, extra);
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
