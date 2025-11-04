# FastMCP Server for Dynamic SDUI Generation

This directory contains a pre-packaged MCP (Model-Centric Programming) server built with [FastMCP](https://gofastmcp.com/). This server provides the prompts and logic necessary to generate entire Server-Driven UI (SDUI) applications or individual components for existing SDUI apps within this project.

## What is FastMCP?

FastMCP is a Python library that simplifies the creation of MCP servers, allowing you to easily expose your own tools and prompts to compatible clients, like the Gemini CLI.

To install FastMCP, please visit the official documentation:
[**FastMCP Installation Guide**](https://gofastmcp.com/getting-started/installation)

## Integration with Gemini CLI

The easiest way to interact with this server and use the generative prompts is through the [Gemini CLI](https://github.com/google/gemini-cli).

### Get Started Today

Want to try out the integration? It’s easy to get up and running with Gemini CLI and FastMCP.

1.  **Install Gemini CLI**: `npm install -g @google/gemini-cli@latest`
2.  **Install FastMCP** (*v2.12.3* or later): `pip install fastmcp>=2.12.3`
3.  **Create your `server.py`** with custom tools and prompts. ([example](https://gofastmcp.com/integrations/gemini-cli#create-a-server))
4.  **Integrate**: `fastmcp install gemini-cli server.py`
5.  **Launch Gemini CLI** and use `/mcp` to verify.

For more information on the integration between Gemini CLI and FastMCP, check out this blog post:
[**Gemini CLI & FastMCP: Simplifying MCP Server Development**](https://developers.googleblog.com/en/gemini-cli-fastmcp-simplifying-mcp-server-development/)

---

## Available Prompts

You can run the following prompts from the Gemini CLI to generate code for this project.

### 1. Generate a New SDUI Application

*   **Command**: `/generate_dynamic_sdui_app`
*   **Description**: This prompt initiates an interactive workflow to design and generate all the necessary assets for a new dynamic SDUI application. The AI will guide you through a series of questions to define the app's domain, components, and styling, and then generate all the corresponding files.
*   **How to run**: Type `/generate_dynamic_sdui_app` in the Gemini CLI and follow the on-screen instructions.

### 2. Create a New Dynamic Component

*   **Command**: `/create_dynamic_component`
*   **Description**: This prompt allows you to add a new, single component to an *existing* SDUI application. The AI will ask for the application name and a description of the component, then generate the component files and integrate them into the application's context and showcase.
*   **How to run**: Type `/create_dynamic_component` in the Gemini CLI and follow the on-screen instructions.
