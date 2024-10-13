// Login functionality
document.getElementById('login-button').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login data to the server
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert('Login successful!');

        // Store user info in local storage
        const userInfo = {
            username: username, // Assuming the username is what you want to store
            email: result.email, // Ensure your server returns email with the response
            password: password // Only store password if necessary
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userInfo));

        // Hide the login form and show the main content
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert(result.message || 'Login failed!');
    }
});

// Sign-up functionality
document.getElementById('signup-button').addEventListener('click', async function () {
    const newUsername = document.getElementById('signup-username').value;
    const newPassword = document.getElementById('signup-password').value;

    if (newUsername && newPassword) {
        // Send signup data to the server
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername, password: newPassword })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Sign up successful! You can now log in.');
            document.getElementById('signup-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'block';
        } else {
            alert(result.message || 'Sign-up failed!');
        }
    } else {
        alert('Please fill in both fields.');
    }
});
