const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("messageUsername");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const responseMessage = document.getElementById("responseMessage");
const userCount = document.getElementById("userCount");

// Log the client's socket ID


// Display received system messages


// Display received messages


// Display the number of connected users


// Display validation errors


messageForm.addEventListener("submit", (event) => {
    socket.emit("hello", {
        username: "Leanne"
    });
});

function addMessage(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    messages.appendChild(paragraph);
}