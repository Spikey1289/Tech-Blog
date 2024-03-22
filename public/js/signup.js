const signupFormHandler = async (event) => {
    event.preventDefault();

    // Fetch data from the signup form
    const name = document.querySelector('#name-signup').value;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;

    if (name.length < 3) {
        alert('username must be at least 3 characters long.');
        return; // Prevent the form submission if the username is too short
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return; // Prevent the form submission if the password is too short
    }

    // Send a signup request to the server
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        // Handle the server response (e.g., redirect on success, display an error message on failure)
        if (response.ok) {
            window.location.href = '/'; // Redirect to the user's homepage
            alert("you have been signed up!");
        } else {
            // Handle signup failure
            const errorData = await response.json();
            console.error(errorData.error);
            alert("an error has occurred during signup, please try again");
            // Display an error message to the user
        }

    } catch (error) {
        console.error('An error occurred during signup:', error);
    }
}

const logInRedirect = (event) => {
    event.preventDefault();
    window.location.href = '/login';
}


document.querySelector('.login-button').addEventListener('click', logInRedirect)
document.querySelector('.signup-submit').addEventListener('click', signupFormHandler);