const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('../Customer Data/data.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    const matchingUser = userData.find(user => user.username === username && user.password === password);

    if (matchingUser) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(matchingUser));
      window.location.href = '../Dashboard/dashboard.html'; // Redirect to dashboard
    } else {
      message.textContent = 'Invalid username or password.';
    }
  } catch (error) {
    console.error('Error:', error);
    message.textContent = 'An error occurred. Please try again later.';
  }
});
