# Add function/tool calling support for our fleet using Genkit so that natural language chats with the model can become actions.

## Task

1. **Review** the fleet-related functions in `src/server.ts` to identify candidates for tool calling.

2. **Implement Genkit Tool Calling**:
    - Define tools using `ai.defineTool()` with `z` schemas for `name`, `description`, `inputSchema`, and `outputSchema`.
    - Pass the defined `tools` to `ai.generate()` in `/api/chat` so Genkit automatically handles multi-turn tool execution.

3. **UI State Synchronization**:
    - Design a pattern using Angular **`resource`** to fetch data.
    - Use **`linkedSignal`** in components to manage local UI state that tracks the resource values.
    - Automatically trigger resource `.reload()` in `FleetService` whenever a chat interaction resolves, ensuring tool-call side effects are reflected in the UI.

4. **Verification**:
    - Build the app and confirm it is error-free using Angular MCP tools.
    - Use the `chrome-devtools` skill (`chrome-devtools-plugin`) in the browser (do not use `curl`) to verify end-to-end functionality directly in the UI (e.g., adding a ticket via the chat window and seeing it appear in the UI).
