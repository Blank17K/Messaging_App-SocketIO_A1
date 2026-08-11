const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer();
const io = new Server(app);


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    io.emit("systemMessage", {
        text: "A user connected."
    });

    socket.on("hello", (data) => {
        console.log(data);

        io.emit("systemMessage", {
            text: `${data.username} says hello!`
        });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        io.emit("systemMessage", {
            text: "A user disconnected."
        });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});