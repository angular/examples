# Codelab: Enhancing Obsidian Logistics with AI

Welcome to the codelab! In this guide, you'll learn how to take a modern Angular logistics dashboard and supercharge it with AI capabilities using the Gemini CLI, specialized Agent skills, and the Model Context Protocol (MCP).

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)

---

## Environment Setup

First, let's prepare your workspace and tools.

### 1. Project Initialization
Clone this repository to your local machine using `git clone`, navigate to the project root then install the dependencies:
```bash
cd logistics-manager-app
npm install
```

### 2. Install Agent Skills
Skills provide the agent with specialized knowledge. You'll add the `angular-developer` and `developing-genkit-js` skills to help with Angular code generation and Genkit AI integration.

```bash
# Add Angular expertise
npx skills add https://github.com/angular/skills/ --skill angular-developer

# Add Genkit JS expertise
npx skills add firebase/genkit --skill developing-genkit-js
```

Confirm that the agent skills are installed by using the `/skills` commands in your CLI. This may require restarting the CLI.

_Note: You do not have to use the `skills` npm package, you are welcome to use whichever agent skills manager you prefer._

### 3. Configure Plugins & MCP Servers
You can use Model Context Protocol (MCP) and plugins to enable your AI tools to interact with your running application and the browser.

#### Angular MCP Server
This server allows the AI tooling to understand your Angular project structure, components, services, and control the development server (`devserver.start`, `devserver.wait_for_build`, `devserver.stop`).

#### Chrome DevTools Plugin (`chrome-devtools-plugin`)
This allows the AI to inspect the running application in your browser for debugging and UI analysis.

In Antigravity CLI, install the plugin:
```text
/plugin install chrome-devtools-plugin
```

Add the following configuration to `.gemini/settings.json`:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": [
        "-y",
        "@angular/cli",
        "mcp"
      ],
      "disabledTools": [
        "ai_tutor"
      ]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "--yes",
        "chrome-devtools-mcp@1.10.1"
      ]
    }
  }
}
```

Confirm that the servers are installed by using the `/mcp` commands in Gemini CLI. This may require a restart of Gemini CLI.

_Note: The experimental `devserver` tool set is enabled for the Angular MCP server_

---
## Using the MCP Servers and tools
With agent skills and MCP setup, you can ask Gemini CLI to start and stop the development server and to verify changes in the browser throughout this process. It is helpful to ask Gemini CLI to use specific tools to accomplish a task. For example, "Start the Angular development server using the MCP tools" or "Verify the changes in the browser".

At any point, you can opt to manually control the server using `ng serve`. 

## Enhancement 1: AI-Powered Fleet Chat

The `Chat` component in `src/app/components/chat/chat.ts` is currently a UI shell. Your task is to implement the backend and frontend logic to allow users to ask natural language questions about the fleet.

### The Goal
A user should be able to type: *"Which units are currently in critical status and have less than 10% battery?"* and receive a concise list.

### Implementation Steps
1. **Service Integration**: Update `FleetService` to include a `queryFleet(prompt: string)` method.
2. **AI Logic**: Use the `gemini-sdk` skill to generate a prompt that sends the current `units()` state to Gemini and asks it to filter the data based on the user's input.
3. **UI Binding**: Connect the chat input and message list in `chat.ts` to the `FleetService`.
4. Use the ChromeDevTools MCP tools to verify the solution.
---

## Enhancement 2: Intelligent Service Prioritization

Currently, users manually select a priority when creating a service ticket. Let's automate this using AI analysis of the issue description.

### The Goal
When a user describes an issue like *"The vehicle is emitting smoke and the engine has stopped,"* the AI should automatically set the priority to `CRITICAL`.

### Implementation Steps
1. **Form Hook**: In `service-queue.ts`, add a listener to the `issue` field in the `serviceForm`.
2. **AI Analysis**: Create a small utility that sends the issue text to Gemini with a system prompt: *"Analyze this logistics vehicle issue and return one of: LOW, MEDIUM, HIGH, CRITICAL."*
3. **Auto-update**: Use the result to update the `priority` field in the form automatically as the user types or on blur.
4. Use the ChromeDevTools MCP tools to verify the solution.

---

## Enhancement 3: Predictive Battery Health Diagnostics

Add a "Run Diagnostic" feature to the vehicle detail view that predicts potential failures before they happen.

### The Goal
In the `FleetDetailModal`, provide a "Run AI Diagnostic" button. When clicked, it analyzes the unit's `speed`, `battery`, and `status` history to provide a "Health Score" and a "Recommended Action."

### Implementation Steps
1. **Diagnostic Action**: Add a button to the `FleetDetailModal` template.
2. **Telemetry Payload**: Gather the `FleetUnit` data and any historical trends (if available in `fleet-db.ts`).
3. **AI Insight**: Send this telemetry to Gemini to generate a report.
   - Example prompt: *"Analyze this unit: Speed 102km/h, Battery 14% (Declining rapidly), Status: Transit. Predict potential failure points."*
4. **Result Display**: Show the AI's response in a new "Diagnostics" section within the modal.
5. Use the ChromeDevTools MCP tools to verify the solution.

---

## Summary
By completing these enhancements, you've transformed a static dashboard into an intelligent command center. You've leveraged:
- **Angular Signals** for reactive state management.
- **Gemini CLI Skills** for expert-level coding assistance.
- **MCP Servers** for deep integration between your AI and your workspace.
