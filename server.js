const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let userCountServerCOunt = 0;
io.on("connection", (socket) => {
    ++userCountServerCOunt;
    console.log(`User connected: ${socket.id}`);

    socket.once("connect-user", (data)=>{
        
        socket.emit("userid",{
            userID: socket.id
        });
    });
    io.emit("updateUserCount", {
        text: "A user connected.",
        userCount: userCountServerCOunt
    });

    socket.on("sendMessage", (data) => {
        console.log(data);

        const validationResult = validation(data.username, data.message);
        if (validationResult.error) {
            socket.emit("systemMessage", {
                text: validationResult.error
            });
            return;
        }

        io.emit("systemMessage", {
            text: `${getTimeMIN(data.timestamp)}-${data.username}: ${data.message}`,
        });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        --userCountServerCOunt;
        io.emit("systemMessage", {
            text: "A user disconnected.",
            userCount: userCountServerCOunt
        });
    });
});

const PORT = process.env.PORT||3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

function getTimeMIN(timestamp){
    //let timestamp = new Date().toISOString();
    timestamp = timestamp.split("T")[1].split(".")[0];
    return timestamp.substring(0,5);
}
function validation(usernameInput, messageInput){
    let username = usernameInput.value.trim();
    if(username === ""){
        return {error: "Please enter a username."};
    }
    let message = messageInput.value.trim();
    if(message === ""){
        return {error: "Please enter a message."};
    }
    return {error: null};
}