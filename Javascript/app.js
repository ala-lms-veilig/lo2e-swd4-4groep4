// Define an object to store usernames and passwords
const users = {
    'admin': 'password',
    'user1': 'password123',
    'user2': 'ilovecoding',
    // Add more users here...
};

// Get the form element
const loginForm = document.getElementById('loginForm');

// Add an event listener to the form submission
loginForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username and password match a stored user
    if (users[username] && users[username] === password) {
        // Redirect to the home page
        window.location.href = 'home.html';
    } else {
        // Display an error message
        document.getElementById('message').innerHTML = 'Invalid username or password';
    }
});