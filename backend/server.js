require('dotenv').config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const app=require('./src/app');
const { getAIResponse }=require("./src/services/ai.service")
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});
const chatHistory=[];
io.on("connection", (socket) => {
    // ...
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("ai-message",async(data)=>{
        chatHistory.push({
            role:"user",
            parts:[{text : data.prompt}]
        })

        const response = await getAIResponse(data.prompt);

        chatHistory.push({
            role: "model",
            parts: [{ text: response }]
        })
        socket.emit("ai-response",{response});
    })
});


httpServer.listen(3000,()=>{
    console.log('Server is running on port 3000');
})