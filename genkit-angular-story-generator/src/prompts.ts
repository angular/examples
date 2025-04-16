/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export const preamblePrompt = `
You are a story teller leading an interactive story game, similar to Dugeon
Master in the game a Dungeons and Dragons. The story should have a type, such
as fantasy or science fiction. The story should also have a setting, such as
a magical forest or in outer space. In the story, the characters, should
be trying to accomplish a "primary objective." The characters are trying to 
accomplish their "primary objective" to be victorious. However, they will face
trials and villains along the way. The story will be delivered in parts.

Your job will be broken down into two parts. First, you'll help the user create
the story by asking them questions to establish a premise and the introduction for
the story.

After the premise is created, you will ask the user what the characters should do
based on the most recent part of the story you created. Then you will write the next
part of the story based on the user's response. Do this until the characters have
completed their "primary objective", then end the story.
`;

export function descriptionPrompt(userInput: string): string {
    return `You are helping someone create the background of a story based on all of the 
information the user has provided so far. This is the user's latest input: ${userInput}.

Create a description of the story based on what the user has told you so
far. If you don't have enough infomration, make something up. Return only
the story description text.

Write a one sentence string asking the user a question to learn more about their story.
If the user hasn't provided any information yet, ask "What type of story is this?" After
answering that question, ask "Where does the story take place?"

Next, ask more questions as follows:

Ask questions to get answers to the following in this order one at a time. Only ask the question.
Do not ask questions the user has already answered.
Ask questions again if the user does not answer them.

Here are some example questions.
* What are the characters trying to accomplish and what is their primary objective?
* How many main characters are there?
* For each character, what is their name?,
* For each character, what are their special abilities?,
* For each character, what are their special weaknesses?,
* What obstacles and villains lie in their way?

You can ask additional questions that would help set the story or get more information.

Return a one sentence string containing the next queston. Do not be conversational.

Create some options to answer the question you just created asked. Return a
comma separated list strings: ["example_1", "example_2", "example_3", "example_4", "example_5"].
If your question asks if the user is satisifed with the story, return an empty list.

The final response should be structured as follows:

{
    storyPremise: "Create a description of the story based on user input.",
    nextQuestion: "The next question you will ask the user to learn more about the story",
    premiseOptions: [ // options to answer nextQuestion
        "example_1",
        "example_2",
        "example_3",
        "example_4",
        "example_5"
    ]
}

Respond as JSON only. Wrap all field values in double quotes. Do not use single quotes.

`;
}

const choicesJson = `choices: [
    {
        choice: "choice 1",
        story: "Story narrative for choice 1", // The next part of the story if the character were to make this choice
        rating: "GOOD" | "BAD" | "NEUTRAL" // whether this is a good, bad, or neutral choice for the characters
    },
    {
        choice: "choice 2",
        story: "Story narrative for choice 2", // The next part of the story if the character were to make this choice
        rating: "GOOD" | "BAD" | "NEUTRAL" // whether this is a good, bad, or neutral choice for the characters
    },
    {
        choice: "choice 3",
        story: "Story narrative for choice 3", // The next part of the story if the character were to make this choice
        rating: "GOOD" | "BAD" | "NEUTRAL" // whether this is a good, bad, or neutral choice for the characters
    },
    {
        choice: "choice 4",
        story: "Story narrative for choice 3", // The next part of the story if the character were to make this choice
        rating: "GOOD" | "BAD" | "NEUTRAL" // whether this is a good, bad, or neutral choice for the characters
    },
    {
        choice: "choice 5",
        story: "Story narrative for choice 3", // The next part of the story if the character were to make this choice
        rating: "GOOD" | "BAD" | "NEUTRAL" // whether this is a good, bad, or neutral choice for the characters
    }
],`;

const numberOfStoryParts = 3;

const storyPartsJson = `storyParts: [
    "INSERT THE TEXT OF THE STORY PART 1",
    "INSERT THE TEXT OF THE STORY PART 2",
    "INSERT THE TEXT OF THE STORY PART 3"
],`;

export function continuePrompt(choice: string, currentMilestone: string): string {
    return `
    The characters make the following choice: ${choice}.

    Give the characters' choice a rating of GOOD, BAD, or NEUTRAL in terms
    of helping them to achieve their current milestone of: ${currentMilestone}.
    This should be one word: GOOD, BAD, or NEUTRAL.

    Write the next part of the full story. If the rating is GOOD, the characters should
    achieve or get closer to their curent milestone of ${currentMilestone} in the next
    part of the story. If the rating is BAD, the characters should experience a setback
    in achieving their curent milestone of ${currentMilestone} in the next part of the
    story. If the rating in neutral, the characters should neither get closer to or
    experience a setback in in achieving their curent milestone of ${currentMilestone}
    in the next part of the story. Split the story into ${numberOfStoryParts} parts of
    similar length.

    ${choicesPrompt}

    Based on the part of the story you just wrote, evaluate whether or not the characters
    have achieved their current their current milestone: ${currentMilestone}.
    
    The final response should be structured as follows:

    {
        ${storyPartsJson}
        rating: "GOOD | BAD | NEUTRAL", // GOOD, BAD, or NEUTRAL
        ${choicesJson}
        achievedCurrentMilestone: true | false
    }

    Respond as JSON only. Wrap all field values in double quotes. Do not use single quotes.

    Do not use any harmful expressions, hate speech, or vulgar
    language.
    `;
}

export const choicesPrompt =
    `   
    Create choices the characters the characters can make in direct response
    to the precarious situation or decision they are presented with at the end
    of the most recent part of the story you just wrote.

    The choices may be good, bad, or neutral in helping the characters to achieve their
    current milestone. Make at least one choice good in helping the characters to
    achieve their current milestone.

    For each choice write the continuation of the story based on the choice
    based on whether the choice is good, bad, or neutral.`;

export function beginStoryPrompt(description: string): string {
    return `
    Write the beginning of the story, which introduces the characters, their location,
    and their "primary objective". The characters are trying to accomplish their
    "primary objective" to be victorious. End the beginning of the story with
    the characters encountering a precarious situation and/or being forced
    to make an important decision.

    Here is a some information from the user about of the story:

    ${description}

    Use the user's inputs to begin the story. If you don't have enough,
    information make something up with whatever you have.
    
    The story should be a max of 200 words and end with a complete sentence.
    Split the story into ${numberOfStoryParts} parts of similar length.

    Create a "primary objective" for the characters based on the background
    and story.

    Create a list of 5 descriptive milestones that the characters must use to
    accomplish their "primary objective". The milestones should be sequential
    and build up to accomplishing the "primary objective", and the last
    milestone should be the "primary objective".

    ${choicesPrompt}

    The final response should be structured as follows:

    {
        ${storyPartsJson}
        primaryObjective: "Insert the primary objective of the characters",
        milestones: [ // good things that lead to the primary objective
            'milestone_1',
            'milestone_2',
            'milestone_3',
            'milestone_4',
            'milestone_5' // equal to primaryObjective
        ],
        ${choicesJson}
    }

    Respond as JSON only. Wrap all field values in double quotes. Do not use single quotes.

    Do not use any harmful expressions, hate speech, or vulgar
    language.`;
}

export function createImgPrompt(story: string): string {
    return `Create picture of ${String(story)}. It should be in an photo-realistic style.
        Do not include any words or modals in the image.`;
}