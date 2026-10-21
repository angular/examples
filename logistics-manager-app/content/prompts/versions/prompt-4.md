# I need to verify and refine the Genkit tool calling setup in `src/server.ts`.

**Key Requirements:**
1. Initialize Genkit with `genkit({ plugins: [googleAI()], model: googleAI.model('gemini-3-flash-preview') })`.
2. Define each fleet and service-queue tool using `ai.defineTool({ name, description, inputSchema, outputSchema }, handler)` with `z` imported from `'genkit'`.
3. Pass all defined tools in the `tools` array of `ai.generate({ prompt, tools })`.
4. Do **not** use `@genkit-ai/express` (Express v5 is used by Angular SSR).

## Show me your plan before you make any changes so we can be on the same page
