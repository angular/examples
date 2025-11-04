# Dynamic SDUI Generation Framework with Angular and AI

This repository contains an *experimental and exploratory* framework for building and running dynamic, AI-powered, Server-Driven UI (SDUI) applications using Angular and a generative AI backend. The system uses a unique two-AI architecture: a **Generator AI** to help developers scaffold application assets and an **Executor AI** to render UIs dynamically at runtime.

**Please note: This is an experimental project and not an official Angular solution for generating SDUI apps.** 

##  Core Concepts

The framework is built on the idea of separating the application's UI components from the logic that assembles them. An AI-powered backend takes on the role of a real-time UI/UX designer, constructing views on the fly based on user intent.

### The Two-AI Architecture

1.  **Generator AI**: An interactive command-line tool, powered by a Python MCP (Model-Centric Programming) server. It guides a developer through a series of questions to design, define, and generate all the necessary assets for a new dynamic application. This includes creating Angular components, configuration files, and theme variables.

2.  **Executor AI**: A runtime AI, powered by [Genkit](https://genkit.dev/) flows. When a user interacts with the running application (e.g., through a chat interface), the Executor AI receives the user's prompt, analyzes the available data and UI components, and generates a JSON-based `componentSchema` that represents the entire view layout. The Angular frontend then renders this schema into a fully interactive UI.

### The `app-context.ts` File

Each dynamic application has a central manifest file called `app-context.ts`. This file is crucial as it provides the Executor AI with all the context it needs to build a UI. It contains:
*   **App Metadata**: The application's name, theme, and welcome messages.
*   **Component Map**: A registry that maps component names to their actual Angular component classes.
*   **Component Context**: Detailed metadata for each component, including its purpose and input properties.
*   **App Description & Layout Rules**: A detailed prompt for the Executor AI, explaining the application's domain and defining `LayoutCompositions`—rules for how to assemble components for different scenarios (e.g., a "list view" vs. a "detail view").

---

## How It Works: The Rendering Flow

1.  **User Interaction**: A user types a prompt into the chat interface of the running Angular application (e.g., "show me modern lofts in New York").
2.  **Genkit Flow**: The prompt is sent to the Genkit backend, which triggers the Executor AI flow.
3.  **AI-Powered Layout Generation**: The Executor AI analyzes the user's prompt, the `app-context.ts` for the current application, and the available data (from `data-store.ts`). It then constructs a detailed JSON `componentSchema` that represents the optimal UI layout for the user's request.
4.  **Dynamic Rendering**: The Angular frontend receives this JSON schema.
5.  **UI Display**: The `MagicAiRendererComponent` recursively walks the JSON tree and dynamically creates and renders the corresponding Angular components, resulting in a fully interactive view generated in real-time.

---

## Sample Applications

This repository includes three sample applications to demonstrate the framework's capabilities. You can switch between these applications by updating the `APP_NAME` constant in `src/app/magic-ai/app-context.ts`.

### 1. Haven - Vacation Rentals

*   **Description**: An application for discovering and booking vacation rentals. The AI can generate views for property listings, detailed property pages, and inspirational destination cards.
*   **Directory**: `src/app/apps/vacation-rentals`

### 2. Magic Bookstore

*   **Description**: An e-commerce application for a bookstore. The AI can create layouts for book search results, detailed product pages with author bios and reviews, and carousels of related books.
*   **Directory**: `src/app/apps/magic-bookstore`

### 3. Adev Docs - Angular Documentation

*   **Description**: A dynamic documentation site for the Angular framework. The AI can assemble complex, informative pages by combining concept explanations, API references, code snippets, and full code examples in response to a user's query.
*   **Directory**: `src/app/apps/adev-docs`
* **Please note**: This is a sample application and is not intended to be used as an official source for Angular documentation.

---

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [pnpm](https://pnpm.io/installation)
*   [Angular CLI](https://angular.io/cli)
*   [Python](https://www.python.org/downloads/) (3.x recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install the Node.js dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

1.  **Start the Angular Development Server**:
    This will serve the frontend application.
    ```bash
    ng serve
    ```
    The application will be available at `http://localhost:4200/`.



---

## Creating a New Dynamic Application

This application comes packaged with an MCP server that allows you to easily create your own SDUI application like the provided samples. For detailed instructions on how to use the Generator AI, please refer to the [MCP Server README](mcp-server/README.md).

---

## Project Structure

```
/
├── mcp-server/               # Python server for the Generator AI
│   └── server.py
├── src/
│   ├── app/
│   │   ├── apps/             # Contains the dynamic application packages
│   │   │   ├── vacation-rentals/
│   │   │   │   ├── components/
│   │   │   │   └── app-context.ts  # The "manifest" for the Haven app
│   │   │   └── ...
│   │   ├── magic-ai/         # Core logic for rendering AI-generated schemas
│   │   │   └── magic-ai-renderer.component.ts
│   │   └── chat/             # The main chat interface component
│   └── genkit-utils/         # Genkit flows and prompts for the Executor AI
│       ├── flows.ts
│       └── prompts.ts
└── angular.json
└── package.json
```