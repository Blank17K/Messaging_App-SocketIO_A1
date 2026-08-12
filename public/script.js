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
function displayMessage(text){
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    messages.appendChild(paragraph);
}

// Display the number of connected users
function userCountUpdate(count){
    userCount.innerHTML      = `Users online: ${count}`
}

// Display validation errors
function validation(){
    let username = usernameInput.value.trim();
    if(username === ""){
        responseMessage.innerHTML = "Please enter a username.";
        return false;
    }
    let message = messageInput.value.trim();
    if(message === ""){
        responseMessage.innerHTML = `${username} Please enter a message.`;
        return false;
    }
    return true;
}

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if(!validation())
        return;
    socket.emit("sendMessage", {
        username: usernameInput.value.trim(),
        message: messageInput.value,
        timestamp: new Date().toISOString()
    });
});

function addMessage(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    messages.appendChild(paragraph);
}

socket.on('updateUserCount', (response)=>{
    userCountUpdate(response.userCount);
});

socket.on('systemMessage', (response)=>{
    if(response.error){
        responseMessage.innerHTML = response.error;
        return;
    }
    displayMessage(response.text);
});

