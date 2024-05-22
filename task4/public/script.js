document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
  
    passwordInput.addEventListener('input', function() {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
      updatePasswordStrengthIndicator(strength);
    });
  
    function calculatePasswordStrength(password) {
      if (password.length < 5) {
        return 'Weak';
      } else if (password.length < 8) {
        return 'Moderate';
      } else {
        return 'Strong';
      }
    }
  
    function updatePasswordStrengthIndicator(strength) {
      passwordStrength.textContent = 'Password Strength: '+strength;
    }
  
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (validateForm(username, password)) {
        sendDataToBackend(username, password);
      } else {
        alert('Form validation failed!');
      }
    });
  
    function validateForm(username, password) {
      return username.trim() !== '' && password.trim() !== '';
    }
  
    function sendDataToBackend(username, password) {
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => {
        if (response.ok) {
          console.log('Registration successful!');
        } else {
          console.error('Registration failed.');
        }
      })
      .catch(error => console.error('Error:', error));
    }
  });
  