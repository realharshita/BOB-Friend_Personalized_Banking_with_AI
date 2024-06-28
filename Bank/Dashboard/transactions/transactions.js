document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const user = data.find(user => user.username === 'John'); // Replace with actual logged-in user logic
      if (!user) {
        window.location.href = '../Login/login.html'; // Redirect to login if user not found
        return;
      }

      // Populate transaction data
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

      // Create a pie chart for spending categories
      const categories = {};
      user.account.transactions.forEach(transaction => {
        const category = transaction.category;
        if (categories[category]) {
          categories[category] += Math.abs(transaction.amount);
        } else {
          categories[category] = Math.abs(transaction.amount);
        }
      });

      const pieData = {
        labels: Object.keys(categories),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#f6e58d',
            '#95afc0',
            '#badc58'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#f6e58d',
            '#95afc0',
            '#badc58'
          ]
        }]
      };

      const ctx = document.getElementById('pieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: pieData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom'
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                const currentValue = dataset.data[tooltipItem.index];
                const percent = Math.round((currentValue / total) * 100);
                return `${data.labels[tooltipItem.index]}: ₹${currentValue.toFixed(2)} (${percent}%)`;
              }
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
