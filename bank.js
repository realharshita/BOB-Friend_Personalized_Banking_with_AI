const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'harshita' && password === 'harshita') {
    window.location.href = 'dashboard.html';
  } else {
    message.textContent = 'Invalid username or password.';
  }
});
