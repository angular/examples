/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { genkit, MessageData } from 'genkit/beta';
import { z } from "zod";
import { googleAI } from "@genkit-ai/googleai";
import { vertexAI } from '@genkit-ai/vertexai';
import { systemInstructions } from './prompts';
import { DATA } from './data-store';

const ai = genkit({
  plugins: [googleAI(), vertexAI({ location: 'us-central1' })],
  model: googleAI.model('gemini-2.5-flash'),
});

// A simple in-memory store for conversation history.
const historyStore: Record<string, MessageData[]> = {};

async function loadHistory(sessionId: string): Promise<MessageData[]> {
  return historyStore[sessionId] || [];
}

async function saveHistory(sessionId: string, history: MessageData[]) {
  historyStore[sessionId] = history;
}

// Define the Zod schemas for the expected output
const DynamicComponentSchema = z.object({
  type: z.string(), // 'componentSchema'
  name: z.string(),
  inputs: z.record(z.string(), z.any()).optional(),
});

const BaseDynamicElementSchema = z.object({
  type: z.string(), // 'elementSchema'
  element: z.string(),
  attributes: z.record(z.string(), z.any()).optional(),
});

const TextSchema = z.object({
  type: z.string(), // 'textSchema'
  text: z.string(),
});

type DynamicElement = z.infer<typeof BaseDynamicElementSchema> & {
  children: (DynamicElement | z.infer<typeof DynamicComponentSchema> | z.infer<typeof TextSchema>)[];
};

const DynamicElementSchema: z.ZodType<DynamicElement> = BaseDynamicElementSchema.extend({
  children: z.lazy(() =>
    z.union([DynamicElementSchema, DynamicComponentSchema, TextSchema]).array()
  ),
});

const FlowResponseSchema = z.object({
  agentResponse: z.string(),
  componentSchema: DynamicElementSchema,
  endOfStream: z.boolean().optional(),
});

export const UiSchema = ai.defineSchema('UiSchema', FlowResponseSchema);

/*
 * Tools may provide a better mechanism for fetching real data.
 */
// const getDataFromDataStore = ai.defineTool(
//   {
//     name: 'getDataFromDataStore',
//     description: 'Fetches all of the data from the datastore',
//     outputSchema: z.array(z.custom<Listing>()),
//   },
//   async () => {
//     return LISTINGS;
//   }
// );

export const generateUIFlow = ai.defineFlow(
  {
    name: 'generateUI',
    inputSchema: z.object({
      appDescription: z.string(),
      message: z.string(),
      sessionId: z.string(),
      componentRegistry: z.array(z.any()),
    }),
    outputSchema: UiSchema,
  },
  async ({ appDescription, message, sessionId, componentRegistry }, { sendChunk }) => {
    try {
      const history = await loadHistory(sessionId);
      history.push({ role: 'user', content: [{ text: message }] });

      const { stream, response } = ai.generateStream({
        system: `
${systemInstructions}
* appDescription: ${appDescription}
* componentRegistry: ${JSON.stringify(componentRegistry, null, 2)}
* datastore: ${DATA}
`,
        prompt: `userPrompt: ${message}`,
        messages: history,
        // tools: [getDataFromDataStore], // Tools may provide a better mechanism for fetching real data rather than hard-coding the data.
      });

      (async () => {
        let latestChunk;
        for await (const chunk of stream) {
          console.log(JSON.stringify(chunk.output));
          if (chunk.output) {
            latestChunk = chunk.output;
            sendChunk(chunk.output);
          }
        }
        // endOfStream property required for signals in client.
        sendChunk({ ...latestChunk, endOfStream: true });
      })();

      const finalResponse = await response;

      let historyToSave = finalResponse.messages;
      // Must remove system prompt before saving.
      if (historyToSave[0]?.role === 'system') {
        historyToSave = historyToSave.slice(1);
      }
      await saveHistory(sessionId, historyToSave);

      return finalResponse.output;
    } catch (e) {
      console.error('Manual prompt test failed:', e);
      throw 'An error has occured.';
    }
  }
);
