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

  // Generate the spending chart
  generateSpendingChart(user.account.transactions);

  // Display currency exchange rates if applicable
  displayCurrencyRates(user.account.transactions);

  document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault(); 
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '../Login/login.html';
  });
});

function generateSpendingChart(transactions) {
  const categories = transactions.reduce((acc, transaction) => {
    if (transaction.category !== 'Income') {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const ctx = document.getElementById('spendingChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom', 
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 500,
          top: 1,
          bottom: 1000
        }
      },
      aspectRatio: 1,
    }
  });
}


function displayCurrencyRates(transactions) {
  const travels = transactions.filter(transaction => transaction.category === 'Travel');
  if (travels.length > 0) {
    const currencyRates = {
      "USD": 74.35,
      "EUR": 88.50,
      "GBP": 103.20
    };

    const currencyRatesDiv = document.getElementById('currencyRates');
    for (const [currency, rate] of Object.entries(currencyRates)) {
      const rateElement = document.createElement('p');
      rateElement.textContent = `1 INR = ${rate} ${currency}`;
      currencyRatesDiv.appendChild(rateElement);
    }
  } else {
    document.querySelector('.currency-rates').style.display = 'none';
  }
}
