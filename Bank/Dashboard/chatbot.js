document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotFrame = document.getElementById('chatbot-frame');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // OpenAI API key (replace with your key)
    const apiKey = 'add_your_own';

    // Send message to OpenAI
    const sendMessageToOpenAI = async (message) => {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150
            })
        });
        const data = await response.json();
        return data.choices[0].text.trim();
    };

    // Add message to chat
    const addMessage = (message, fromUser = false) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = fromUser ? 'chatbot-message-user' : 'chatbot-message-bot';
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Handle send button click
    const handleSendMessage = async () => {
        const message = chatbotInput.value;
        if (message.trim()) {
            addMessage(message, true);
            chatbotInput.value = '';
            const response = await sendMessageToOpenAI(message);
            addMessage(response);
        }
    };

    chatbotSend.addEventListener('click', handleSendMessage);

    // Handle enter key press
    chatbotInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    chatbotButton.addEventListener('click', () => {
        if (chatbotFrame.style.display === 'none' || chatbotFrame.style.display === '') {
            chatbotFrame.style.display = 'flex';
            chatbotButton.textContent = 'Close Chat';
        } else {
            chatbotFrame.style.display = 'none';
            chatbotButton.textContent = 'Chat with us';
        }
    });
});
