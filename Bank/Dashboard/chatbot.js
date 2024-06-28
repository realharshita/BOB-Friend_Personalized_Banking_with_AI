document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotFrame = document.getElementById('chatbot-frame');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // OpenAI API key (replace with your key)
    const apiKey = 'YOUR_OPENAI_API_KEY';

    // Predefined responses for common questions
    const predefinedResponses = {
        'What are your hours of operation?': 'Our hours of operation are Monday to Friday, 9 AM to 5 PM.',
        'How can I reset my password?': 'You can reset your password by clicking on the "Forgot Password" link on the login page.',
        'What is the status of my order?': 'Please provide your order number, and I can check the status for you.',
        'How do I contact customer support?': 'You can contact our customer support at support@example.com or call us at 123-456-7890.'
    };

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        if (chatbotFrame.style.display === 'none' || chatbotFrame.style.display === '') {
            chatbotFrame.style.display = 'block';
            chatbotButton.textContent = 'Close Chat';
        } else {
            chatbotFrame.style.display = 'none';
            chatbotButton.textContent = 'Chat with us';
        }
    });

    // Send message to OpenAI
    const sendMessageToOpenAI = async (message) => {
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: message,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            if (response.ok) {
                return data.choices[0].text.trim();
            } else {
                console.error('OpenAI API error:', data);
                return 'Sorry, I am having trouble understanding that right now.';
            }
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            return 'Sorry, I am having trouble understanding that right now.';
        }
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
    chatbotSend.addEventListener('click', async () => {
        const message = chatbotInput.value;
        if (message.trim()) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Check for predefined response
            const response = predefinedResponses[message] || await sendMessageToOpenAI(message);
            addMessage(response);
        }
    });

    // Handle enter key press
    chatbotInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const message = chatbotInput.value;
            if (message.trim()) {
                addMessage(message, true);
                chatbotInput.value = '';
                
                // Check for predefined response
                const response = predefinedResponses[message] || await sendMessageToOpenAI(message);
                addMessage(response);
            }
        }
    });
});
