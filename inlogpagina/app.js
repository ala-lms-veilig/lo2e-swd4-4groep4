class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    validate(password) {
        return this.password === password;
    }
}

class AuthService {
    constructor() {
        this.users = [];
    }

    // Load users from JSON file and store usernames in localStorage
    async loadUsers() {
        try {
            const response = await fetch('users.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.users = data.users.map(user => new User(user.username, user.password));

            // Check if localStorage is available and store usernames
            if (typeof(Storage) !== 'undefined') {
                const usernames = this.users.map(user => user.username);
                localStorage.setItem('usernames', JSON.stringify(usernames));
                console.log('Usernames saved to localStorage');
            } else {
                console.error('localStorage is not available in this browser.');
            }
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    // Login user by checking username and password
    login(username, password) {
        const user = this.users.find(user => user.username === username);
        if (user && user.validate(password)) {
            localStorage.setItem('loggedIn', true);
            return true;
        }
        return false;
    }

    // Logout user and clear session
    logout() {
        localStorage.removeItem('loggedIn');
    }

    // Retrieve stored usernames from localStorage
    getUsernames() {
        return JSON.parse(localStorage.getItem('usernames')) || [];
    }
}

// DOMContentLoaded event ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const authService = new AuthService();
    authService.loadUsers();

    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // Check if loginForm exists before adding event listener
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (authService.login(username, password)) {
                messageDiv.textContent = 'Succesvol ingelogd!';
                window.location.href = 'dashboard.html'; // Redirect after successful login
            } else {
                messageDiv.textContent = 'Foutieve gebruikersnaam of wachtwoord.';
            }
        });
    }

    // Check if the user is logged in and redirect if necessary
    if (localStorage.getItem('loggedIn')) {
        console.log('Gebruiker is ingelogd');
    } else {
        if (window.location.pathname !== '/login.html') {
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }
    }
});
