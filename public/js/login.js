const loginFormHandler = async (event) => {
  event.preventDefault();

  // Fetch data from the login form
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;

  // Send a login request to the server
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle the server response (e.g., redirect on success, display an error message on failure)
    if (response.ok) {
      window.location.href = '/'; // Redirect to the user's dashboard
    } else {
      alert('An error occurred during login');
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    alert('An error occurred during login');
  }
}
const signInRedirect = (event) => {
  event.preventDefault();
  window.location.href = '/signup';
}


document.querySelector('.signup-button').addEventListener('click', signInRedirect)
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);