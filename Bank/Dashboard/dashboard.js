document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
    if (!user) {
      window.location.href = '../Login/login.html'; // Redirect to login if not logged in
      return;
    }
  
    // Populate the dashboard with user data
    document.getElementById('user-name').textContent = user.firstName + ' ' + user.lastName;
    document.getElementById('account-number').textContent = user.account.accountId;
    document.getElementById('available-balance').textContent = user.account.balance.toFixed(2);
    document.getElementById('account-type').textContent = user.account.accountType + ' Account';
  
    // Populate transactions
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
  
    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = '../Login/login.html';
    });
  });
  