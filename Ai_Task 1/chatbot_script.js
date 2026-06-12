function sendMessage() {

    let input = document.getElementById("userInput");
    let message = input.value.trim();

    if(message === "") return;

    let chatBox = document.getElementById("chatBox");

    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    let response = getBotResponse(message.toLowerCase());

    let botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.innerText = response;

    setTimeout(() => {
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
}

function getBotResponse(input){

    if(input.includes("hello") || input.includes("hi")){
        return "Hello! How can I help you?";
    }

    else if(input.includes("how are you")){
        return "I'm fine. Thanks for asking!";
    }

    else if(input.includes("your name")){
        return "My name is Smart Chatbot.";
    }

    else if(input.includes("time")){
        return "Current Time: " + new Date().toLocaleTimeString();
    }

    else if(input.includes("date")){
        return "Today's Date: " + new Date().toLocaleDateString();
    }

    else if(input.includes("bye")){
        return "Goodbye! Have a nice day.";
    }

    else if(input.includes("thank")){
        return "You're welcome!";
    }

    else{
        return "Sorry, I don't understand that question.";
    }
}