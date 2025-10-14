# Angular: Embeddable MCP UI

This is a basic Angular application that exposes a component as an MCP-UI tool that can be
embedded in chat responses, e.g. via ChatGPT apps.

The meat of the MCP integration is in `src/server.ts`. It uses the following packages:

* `@modelcontextprotocol/sdk`: To expose an MCP endpoint on Angular's server.
* `@mcp-ui/server`: To provide MCP-UI tools & resources on the MCP endpoint.

## Development setup

To start a local development server, run:

```bash
ng serve
```

This is enough to test the MCP server using manual tool calls. To test integrations with deployed
chats, the server must be available on the internet. For ChatGPT, follow these instructions:
https://developers.openai.com/apps-sdk/deploy/connect-chatgpt/

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
