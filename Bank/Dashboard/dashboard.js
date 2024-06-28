document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

  if (!user) {
    window.location.href = '../Login/login.html'; 
    return;
  }

  document.getElementById('user-name').textContent = user.firstName + ' ' + user.lastName;
  document.getElementById('account-number').textContent = user.account.accountId;
  document.getElementById('available-balance').textContent = user.account.balance.toFixed(2);
  document.getElementById('account-type').textContent = user.account.accountType + ' Account';

  const transactionsBody = document.getElementById('transactions-body');
  user.account.transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.amount.toFixed(2)}</td>
    `;
    transactionsBody.appendChild(row);
  });

  document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault(); 
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '../Login/login.html';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');

  chatbotToggle.addEventListener('click', () => {
      chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
  });

document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');

  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
  });


  const openaiChatFrame = document.createElement('iframe');
  openaiChatFrame.id = 'openai-chat';
  openaiChatFrame.src = 'https://your-openai-chat-url'; 
  openaiChatFrame.style.width = '100%';
  openaiChatFrame.style.height = '100%';
  openaiChatFrame.style.border = 'none';
  chatbotWindow.appendChild(openaiChatFrame);
});

  const openaiChatFrame = document.createElement('iframe');
  openaiChatFrame.id = 'openai-chat';
  openaiChatFrame.src = 'https://your-openai-chat-url';
  openaiChatFrame.style.width = '100%';
  openaiChatFrame.style.height = '100%';
  chatbotWindow.appendChild(openaiChatFrame);
});
