/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Chat, genkit, Session } from 'genkit/beta';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { parse } from 'partial-json';
import { z } from 'zod';

const model = gemini20Flash;

const ai = genkit({
  plugins: [googleAI()],
  model
});
  
let session: Session;

const getDateTime = ai.defineTool(
  {
    name: 'getDateTime',
    description: 'Gets the current date and time',
    outputSchema: z.string(),
  },
  async (input) => {
    // Here, we would typically make an API call or database query. For this
    // example, we just return the date and time.
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return `The current date and time is ${formattedDate} ${formattedTime}`;
  }
);
  
/**
 * Define a flow to execute. You can call any flow using this pattern,
 * such as those that use `generate()` to generate text or images
 * outside the context of a chat session.
 */
export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      userInput: z.string(),
      sessionId: z.string(),
      clearSession: z.boolean()
    }),
    outputSchema: z.object({
      agentResponse: z.string(),
      options: z.optional(z.array(z.string()))
    })
  },
  async ({ userInput, sessionId, clearSession }) => {
    if (userInput.length === 0) {
      userInput = 'Hi';
    }

    let chat: Chat;
    if (clearSession) {
        session = ai.createSession({ sessionId });
        await session.updateMessages(sessionId, []);
    }
    chat = session.chat({ sessionId, model, tools: [getDateTime] });
    const prompt = `
    You're a general purpose assistant that can respond to a variety of user queries.

    If the user asks for the date and time, call a tool to get the date and time.

    User input: ${userInput}

    Respond to the user and, if you ask the user a question, provide some options 
    for the user to answer your question. You can ask the user clarifying questions
    to get more information.

    Final responses should be structured as follows:

    {
      agentResponse: "INSERT YOUR RESPONSE",
      options: [ // options to answer agentResponse if it is a question
        "option_1",
        "option_2",
        "option_3",
        ...
      ]
    }

    Respond as JSON only. Wrap all field values in double quotes. Do not use single quotes.`

    const { text } = await chat.send({ prompt });
    return parse(maybeStripMarkdown(text));
  }
);

const markdownRegex = /^\s*(```json)?((.|\n)*?)(```)?\s*$/i;
function maybeStripMarkdown(withMarkdown: string) {
  const mdMatch = markdownRegex.exec(withMarkdown);
  if (!mdMatch) {
    return withMarkdown;
  }
  return mdMatch[2];
}