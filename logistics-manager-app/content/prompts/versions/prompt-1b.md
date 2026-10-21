# Add Genkit support to my Angular project's backend (Node.js).

Technical Stack:  
* Packages: `genkit` and `@genkit-ai/google-genai`
* Model: `gemini-3-flash-preview`

## Task:

1. Review my current server entry point (`src/server.ts`) and suggest how to initialize Genkit.

2. Implement a new POST endpoint (`/api/chat`) that accepts a `prompt` and returns a generated response (`{ text }`) using Genkit.

3. Verify that the endpoint is working by building the app, running the server, and using `curl` to test `/api/chat`.
