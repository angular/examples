/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Chat, genkit, Session } from "genkit/beta";
import { z } from "zod";
import { imagen3Fast, vertexAI, gemini15Pro } from '@genkit-ai/vertexai';
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { beginStoryPrompt, createImgPrompt, continuePrompt, descriptionPrompt, preamblePrompt } from './prompts';
import { parse } from 'partial-json';

// Defined twice to easily swap models
const model = gemini20Flash;

const ai = genkit({
  plugins: [googleAI(), vertexAI({ location: 'us-central1' })],
});

const preamble = ai.definePrompt(
    { name: 'preamble' },
    preamblePrompt
);

interface MyState {
    primaryObjective?: string;
    milestones?: string[];
    currentMilestone?: string;
  }
let session: Session;

const DescriptionOutput = z.object({
    storyPremise: z.string(),
    nextQuestion: z.string(),
    premiseOptions: z.array(z.string())
});

export const descriptionFlow = ai.defineFlow(
    {
        name: 'descriptionFlow',
        inputSchema: z.object({
            userInput: z.optional(z.string()),
            sessionId: z.string(),
            clearSession: z.boolean()
        }),
        outputSchema: DescriptionOutput
    },
    async ({ userInput, sessionId, clearSession }) => {
        let chat: Chat;
        if (clearSession || !session) {
            session = ai.createSession<MyState>({
                sessionId,
                initialState: {},
            });
            chat = session.chat(preamble, { sessionId, model });
            await session.updateMessages(sessionId, []);
        } else {
            chat = session.chat({ sessionId, model });
        }
        try {
            const { text } = await chat.send(descriptionPrompt(userInput || ''));
            return parse(maybeStripMarkdown(text));
        } catch {
            return {
                storyPremise: '',
                nextQuestion: 'Tell me more about the story',
                premiseOptions: []
            }
        }
    }
);

const StoryDetail = z.object({
    story: z.optional(z.string()),
    storyParts: z.array(z.string()),
    primaryObjective: z.string(),
    milestones: z.array(z.string()),
    progress: z.number(),
    choices: z.array(z.object({
        choice: z.string(),
        rating: z.string()
    }))
});

const StoryOutput = z.object({
    storyParts: z.array(z.string()),
    options: z.array(z.string()),
    primaryObjective: z.string(),
    progress: z.number()
});

export const beginStoryFlow = ai.defineFlow(
    {
        name: 'beginStoryFlow',
        inputSchema: z.object({
            userInput: z.string(),
            sessionId: z.string()
        }),
        outputSchema: StoryOutput
    },
    async ({ userInput, sessionId }) => {
        let storyParts: string[] = [];
        let options: string[] = [];
        let primaryObjective = '';
        try {
            const chat = session.chat({ sessionId, model });
            const { text } = await chat.send(beginStoryPrompt(userInput));
            let storyDetail: z.infer<typeof StoryDetail>;
            storyDetail = parse(maybeStripMarkdown(text));
            storyParts = storyDetail.storyParts;
            primaryObjective = storyDetail.primaryObjective;
            session.updateState({
                primaryObjective,
                milestones: storyDetail.milestones,
                currentMilestone: storyDetail.milestones[0]
            });
            storyDetail.progress = 0;
            options = storyDetail.choices.map(choice => choice.choice);
        } catch (e) {
            console.log(e);
        }
        return { storyParts, options, progress: 0, primaryObjective };
    }
);

const ContStoryDetail = z.object({
    story: z.optional(z.string()),
    storyParts: z.array(z.string()),
    rating: z.string(),
    primaryObjective: z.string(),
    achievedCurrentMilestone: z.boolean(),
    progress: z.number(),
    choices: z.array(z.object({
        choice: z.string(),
        rating: z.string()
    })),
});

export const continueStoryFlow = ai.defineFlow(
    {
        name: 'continueStoryFlow',
        inputSchema: z.object({
            userInput: z.string(),
            sessionId: z.string()
        }),
        outputSchema: StoryOutput.extend({ rating: z.string() })
    },
    async ({ userInput, sessionId}) => {
        const chat = session.chat({ sessionId, model });

        let storyParts: string[] = [];
        let options: string[] = [];
        let rating: string = 'NEUTRAL';
        let primaryObjective = session.state.primaryObjective;
        let progress = -1;

        try {
            const { text } = await chat.send(continuePrompt(userInput, session.state.currentMilestone));
            const storyDetail: z.infer<typeof ContStoryDetail> = parse(maybeStripMarkdown(text));
            storyParts = storyDetail.storyParts;
            options = storyDetail.choices.map(choice => choice.choice);
            rating = storyDetail.rating;
            const acheivedMilestone = storyDetail.achievedCurrentMilestone;
            const progressResponse = await handleProgress(storyParts, acheivedMilestone, sessionId);
            storyParts = progressResponse.storyParts;
            progress = progressResponse.progress;
            primaryObjective = session.state.primaryObjective;
        } catch (e) {
            console.log(e);
        }
        return { storyParts, options, primaryObjective, progress, rating };
    }
);

/**
 * Handles logic to move the story forward, updates manages the current
 * session state's current milestone based on whether or not the next milestone
 * was achieved, and calculates the progress. If the final milestone was acheived,
 * meaning the story is over, gets the story ending and appends this to the story
 * parts, which will ultimately be returned from the calling flow.
 *
 * @param storyParts the story parts returned from the model
 * @param achievedMilestone whether or not the next milestone was achieved
 * @param sessionId the sessionId
 * @returns updated storyParts and progress
 */
async function handleProgress(
        storyParts: string[],
        achievedMilestone: boolean,
        sessionId: string): Promise<{ storyParts: string[], progress: number }> {
    let currentMilestone = session.state.currentMilestone;
    const milestones = session.state.milestones;
    const finalMilestone = milestones[milestones.length - 1];
    let progress = milestones.indexOf(currentMilestone) / milestones.length;
    if (achievedMilestone && currentMilestone === finalMilestone) {
        progress = 1;
        const storyEnding = await endStoryFlow(sessionId);
        storyParts = [...storyParts, ...storyEnding];
    } else if (achievedMilestone) {
        const nextMilestoneIndex = milestones.indexOf(currentMilestone) + 1;
        currentMilestone = milestones[nextMilestoneIndex];
        progress = nextMilestoneIndex / milestones.length;
        session.updateState({ ...session.state, currentMilestone });
    }
    return { storyParts, progress };
}

const endStoryFlow = ai.defineFlow(
    {
        name: 'endStoryFlow',
        inputSchema: z.string(),
        outputSchema: z.array(z.string())
    },
    async (sessionId) => {
        try {
            const chat = session.chat({ sessionId, model });
            const { text } = await chat.send(`
                The characters have achieved their primary objective.
                Write the conclusion of the story. Don't repeat any
                of the story. This next part should be a max of 200 words.
                Split the story into 3 parts of similar length. Return an 
                array of strings with the story parts.
            `);
            return parse(maybeStripMarkdown(text));
        } catch {
            return [];
        }
    }  
);

export const genImgFlow = ai.defineFlow(
    {
        name: 'genImgFlow',
        inputSchema: z.object({
            story: z.string(),
            sessionId: z.string()
        }),
        outputSchema: z.string()
    },
    async ({ story, sessionId }) => {
        return await genImgBlob(story, sessionId);
    }
);

async function genImgBlob(story: string, sessionId: string): Promise<string> {
    const chat = session.chat({ sessionId, model });
    const { text: storyImgDescr } = await chat.send(`
        Describe an image that the captures the essence of this story: ${story}.
        Do not use any words indicating violence or profanity. Return a string only.
        Do not return JSON.`);
    const imgPrompt = createImgPrompt(storyImgDescr);
    return await imgBlobFlow(imgPrompt);
}

const imgBlobFlow = ai.defineFlow(
    {
        name: 'imgBlobFlow',
        inputSchema: z.string(),
        outputSchema: z.string()
    },
    async (prompt) => {
        try {
            const response = await ai.generate({
                model: imagen3Fast,
                prompt,
                output: { format: 'media' },
            });
            return response.message!.content[0].media!.url;
        } catch(e) {
            console.log(e);
            return '';
        }
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