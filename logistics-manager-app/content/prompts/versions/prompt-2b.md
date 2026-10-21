# I want to communicate from the client to the AI endpoint via the chat window in the web app. 

* Tools: Angular Skills, Angular MCP, `chrome-devtools` plugin (`chrome-devtools-plugin`)

Task:
1. Review the endpoint and chat window code to understand where to integrate.

2. Outline a plan to implement the communication between the client and the server. 
    - Prefer the Angular `resource` API for the client requests to the server.
    - Send the `prompt` to the Genkit `/api/chat` endpoint on the server and display the response in the chat window, automatically scrolling to the bottom when new messages arrive.

3. For verification:
    - build the app and confirm that the build is error free. Use the Angular MCP server tools.
    - use the `chrome-devtools` skill (`chrome-devtools-plugin`) in the browser (do not use `curl`) to preview and verify the chat UI end-to-end
