document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const user = data.find(user => user.username === 'John'); // Replace with actual logged-in user logic
      if (!user) {
        window.location.href = '../Login/login.html'; // Redirect to login if user not found
        return;
      }

      // Transfer form submission
      const transferForm = document.getElementById('transfer-form');
      transferForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const toAccount = transferForm['to-account'].value.trim();
        const amount = parseFloat(transferForm['amount'].value.trim());

        // Perform validation and processing (dummy example)
        if (toAccount && amount > 0 && amount <= user.account.balance) {
          // Process transfer (dummy example)
          alert(`Transfer of ₹${amount.toFixed(2)} to Account ${toAccount} successful.`);
          user.account.balance -= amount; // Update balance (normally backend would handle this)
          console.log(`New balance: ₹${user.account.balance.toFixed(2)}`);
        } else {
          alert('Invalid transfer details. Please check and try again.');
        }

        transferForm.reset();
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

