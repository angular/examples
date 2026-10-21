# Obsidian Logistics Manager — Angular + Genkit Agentic Demo

An interactive fleet and service-queue management web application built with **Angular 21** (Signals, `resource`, `linkedSignal`, Angular Aria, SSR with Express) and **Genkit** (`genkit` + `@genkit-ai/google-genai` powered by `gemini-3-flash-preview`).

This repository accompanies the live stage demo showing how to pair-program with an AI coding agent using **Agent Skills**, **MCP Servers**, and **Antigravity Plugins** (`chrome-devtools-plugin`).

---

## Branches & Demo Steps

You can either start on **`main`** and run each prompt in [`content/prompts/`](./content/prompts/) with your coding agent, or check out any of the completed checkpoint branches directly:

| Branch | Prompt | Description |
| :--- | :--- | :--- |
| **`main`** | — | Clean starter baseline with fleet map, inventory list, service queue, and static chat shell. |
| **`step-1`** | [`content/prompts/prompt-1.md`](./content/prompts/prompt-1.md) | Initializes Genkit with `googleAI()` (`gemini-3-flash-preview`) and adds the `POST /api/chat` endpoint in `src/server.ts`. |
| **`step-2`** | [`content/prompts/prompt-2.md`](./content/prompts/prompt-2.md) | Connects the client chat UI (`src/app/components/chat/chat.ts`) to `/api/chat` using the Angular `resource` API and `afterRenderEffect` auto-scrolling. |
| **`step-3`** | [`content/prompts/prompt-3.md`](./content/prompts/prompt-3.md) | Defines 7 Genkit fleet & service-queue tools (`ai.defineTool`) in `src/server.ts` and synchronizes UI state using Angular `resource`, `linkedSignal`, and `.reload()`. |

To jump straight to the completed application with full Genkit tool calling:

```bash
git checkout step-3
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. Install Agent Skills & Plugins (For Running the Prompts)

If you want to run the prompts in [`content/prompts/`](./content/prompts/) with an AI coding agent from `main`:

1. **Install the Angular & Genkit Agent Skills**:
   ```bash
   npx skills add https://github.com/angular/skills --skill angular-developer
   npx skills add firebase/genkit --skill developing-genkit-js
   ```

2. **Install the Chrome DevTools Plugin** (in Antigravity CLI):
   ```text
   /plugin install chrome-devtools-plugin
   ```

3. **MCP Configuration**:
   - Project MCP settings are included in [`.gemini/settings.json`](./.gemini/settings.json), and agent workspace guidelines are defined in [`AGENTS.md`](./AGENTS.md).

---

## Development Server & Building

To start the local development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

To build the project for production:

```bash
npm run build
```
