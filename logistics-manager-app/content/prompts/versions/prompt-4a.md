# Optimized Genkit Tool-Calling Reference Prompt

Use this prompt to implement or refine tool-calling logic using Genkit in `src/server.ts`.

---

**Task:** Implement tool-calling using `genkit` and `@genkit-ai/google-genai` in Node.js (`src/server.ts`).

**Technical Requirements:**
1. **Model:** Use `googleAI.model('gemini-3-flash-preview')`.
2. **Tool Definition:** Use `ai.defineTool({ name, description, inputSchema, outputSchema }, handler)` with `z` imported from `'genkit'`.
3. **Automatic Orchestration:** Pass `tools: [...]` to `ai.generate({ prompt, tools })`—Genkit automatically executes tool calls across multiple turns and returns the final natural language response in `response.text`.
4. **Express v5 Compatibility:** Invoke `ai.generate()` directly inside `app.post('/api/chat', ...)`; do not import `@genkit-ai/express`.
