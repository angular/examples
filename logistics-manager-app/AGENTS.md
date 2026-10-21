# Project Context & Agent Configuration

**System Directive:** For all tasks within this project workspace, you must prioritize the environment-configured Agent Skills, Antigravity Plugins, and MCP Servers listed below. Do not rely on generalized knowledge if a specialized skill or server can execute the task.

Verify your work using the proper tools available to you.

## 1. Agent Skills & Plugins
Apply the following specialized profiles based on the task domain:

*   **`angular-developer`**: Engage this skill for all frontend architecture, component creation, best practices and modern Angular.
*   **`developing-genkit-js`**: Engage this skill when writing, configuring, or troubleshooting Genkit AI integrations, agents (`ai.defineAgent`), flows (`ai.defineFlow`), and tools (`ai.defineTool`).
    *   **Express v5 Compatibility Note**: Do **NOT** install or import `@genkit-ai/express` (such as `expressHandler`), because Angular 21 SSR uses Express v5 (`^5.1.0`) while `@genkit-ai/express` requires Express v4 (`^4.21.1`). Invoke Genkit agents/flows directly inside standard Express route handlers in `src/server.ts`.
*   **`chrome-devtools` (`chrome-devtools-plugin`)**: Installed via `/plugin install chrome-devtools-plugin` in Antigravity CLI. Engage the `chrome-devtools` skill to automate browser interactions, inspect DOM states, capture console logs, evaluate network payloads, and verify UI changes (`navigate_page`, `wait_for`, `take_snapshot`, `click`, `fill`).

## 2. MCP Servers
Route operations through these Model Context Protocol servers to interact with the local development environment:

*   **angular-cli MCP Server**: Invoke and use tools like the following to control the development server.
    * **`devserver.start`** - starts the Angular dev server
    * **`devserver.stop`** - stops the Angular dev server
    * **`devserver.wait_for_build`** - Returns the output logs of the most recent build in a running development server started by `devserver.start`
*   **Chrome DevTools Plugin (`chrome-devtools-plugin`)**: Installed via `/plugin install chrome-devtools-plugin`. Provides the `chrome-devtools` MCP tools and skills for browser verification and debugging.

## 3. Execution Boundaries
*   **Sequential Execution**: Follow multi-step prompts in exact sequence. Review and implement the code in `src/server.ts` first before running verification.
*   **Environment & Credentials**: `.env` is valid and is already loaded at the top of `src/server.ts` (overriding any stale shell variables). Do **NOT** run standalone pre-flight `node -e` scripts to test API keys, and do **NOT** invoke external cloud/auth CLI tools (`gcloud`, `aws`, etc.). Test against the running application server (use `curl` only when asked to test the backend API directly; use `chrome-devtools` browser tools—not `curl`—when verifying UI and end-to-end flows).
*   **MCP Tool Usage**: Do **NOT** invoke the interactive `ai_tutor` tool from the `angular-cli` MCP server.
