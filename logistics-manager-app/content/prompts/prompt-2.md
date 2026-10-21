# Add communication from the client side app to the AI chat endpoint via the chat window in the web app. 

Task:
1. Review the `/api/chat` endpoint and chat window code (`src/app/components/chat/chat.ts`) to understand where to integrate.

2. Outline a plan to implement the communication between the client and the server:
    - Use the Angular **`resource`** API for the client requests to `/api/chat`.
    - Send the user's `prompt` and display the user and AI messages in the chat window, automatically scrolling the messages container to the bottom when new messages arrive.

3. For verification:
    - Build the app and confirm that the build is error free. Use the Angular MCP server tools.
    - Use the `chrome-devtools` skill (`chrome-devtools-plugin`) in the browser (do not use `curl`) to preview and verify the chat UI end-to-end.
