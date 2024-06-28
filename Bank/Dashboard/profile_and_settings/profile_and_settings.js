document.addEventListener('DOMContentLoaded', () => {
  // Fetching data from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Assuming data.json contains an array of users
      const users = data;

      // For simplicity, let's assume you are using sessionStorage for logged-in user
      const loggedInUsername = sessionStorage.getItem('loggedInUsername');

      // Find the logged-in user from the array
      const loggedInUser = users.find(user => user.username === loggedInUsername);

      if (!loggedInUser) {
        console.error('User not found in data.json.');
        return;
      }

      // Populate profile information
      document.getElementById('user-name').textContent = loggedInUser.firstName + ' ' + loggedInUser.lastName;
      document.getElementById('user-address').value = loggedInUser.address;
      document.getElementById('user-phone').value = loggedInUser.phoneNumber;
      document.getElementById('user-email').value = loggedInUser.email;

      // Update profile information
      const updateForm = document.getElementById('update-form');
      updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Collect updated data
        const updatedData = {
          ...loggedInUser,
          address: updateForm.elements['address'].value,
          phoneNumber: updateForm.elements['phone'].value,
          email: updateForm.elements['email'].value,
        };

        // In a real application, update the data in database or storage
        console.log('Updated Data:', updatedData);
        alert('Profile updated successfully!');
        // Optionally, redirect to dashboard or update display
        // window.location.href = 'dashboard.html'; // Redirect to dashboard
      });

      // Change password
      const changePasswordForm = document.getElementById('change-password-form');
      changePasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newPassword = changePasswordForm.elements['new-password'].value;
        const confirmNewPassword = changePasswordForm.elements['confirm-new-password'].value;

        if (newPassword !== confirmNewPassword) {
          alert('Passwords do not match. Please try again.');
          return;
        }

        // Process password change (in this example, just alerting)
        alert('Password changed successfully!');
        changePasswordForm.reset(); // Reset form after submission
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
