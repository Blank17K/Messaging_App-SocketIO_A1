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
    io.emit("systemMessage", {
        text: "A user connected.",
        userCount: userCountServerCOunt
    });

    socket.on("hello", (data) => {
        console.log(data);

        io.emit("systemMessage", {
            text: `${data.username} says hello!`
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