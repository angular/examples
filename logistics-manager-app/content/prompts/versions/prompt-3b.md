# I want to add function/tool calling support for our fleet using Genkit so that natural language chats with the model can become actions.

* Tools: 
    - Agent Skills & Plugins:
        - `angular-developer`
        - `developing-genkit-js`
        - `chrome-devtools` (`chrome-devtools-plugin`)
    - MCP Servers:
        - Angular MCP

## Task

1. Review the Fleet related functions in the `server.ts` file to know what can be called and how to call them.

2. Outline a plan to implement this feature. 
    - Define tools using `ai.defineTool()` with `z` schemas and pass them to `ai.generate()` in `/api/chat` so Genkit automatically handles multi-turn tool calls.
    - Make a plan for a communication pattern with the UI so that the response from a tool call can create a "state" update on the UI. For example, if the user requests to add vehicles to the repair queue, the server will have an updated state, but the UI will be out of sync. Design a pattern using Angular `resource` to fetch data and a `linkedSignal` to manage the local UI state. When a chat turn completes, trigger resource reloads so the UI reflects the updated fleet and service queue status.

3. For verification:
    - build the app and confirm that the build is error free. Use the Angular MCP server tools.
    - use the `chrome-devtools` skill (`chrome-devtools-plugin`) in the browser (do not use `curl`) to verify end-to-end functionality directly in the UI
