## Step for building ai-chatbot project

1. explore socket.io
2. install and setup socket.io on server side
3. getting responce from ai-model gemini
4. integrate socket.io with ai-model gemini
5. test the real-time chat functionality


## Events in socket.io
- two types of event 
- in-built events 
    - connection
    - socket.on
- custom events
    -socket.on then callback function

## Start the project
- ai.service.js -> setting up socket.io client side
- giving server side events with normal ai function
- getting clint side events with inside the socket.on function i need socket.emit.
- io ->  server
- socket -> single user
- .on -> listen for event
- .emit -> fire the events
- add config systemInstruction from my side
- sort term  memory use with gemini





