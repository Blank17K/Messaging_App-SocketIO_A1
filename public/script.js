const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("messageUsername");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const responseMessage = document.getElementById("responseMessage");
const userCount = document.getElementById("userCount");

// Log the client's socket ID
socket.emit("connect-user");
function userID(id){
    console.log(`Your User ID is: ${id}`);
}
socket.on("userid", data =>{
    userID(data.userID);
});

// Display received system messages


// Display received messages


// Display the number of connected users
function userCountUpdate(count){
    userCount.innerHTML      = `Users online: ${count}`
}

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

socket.on('systemMessage', (response)=>{
    userCountUpdate(response.userCount);
});