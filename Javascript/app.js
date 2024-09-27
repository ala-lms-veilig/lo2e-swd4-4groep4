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

    async loadUsers() {
        try {
            const response = await fetch('users.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.users = data.users.map(user => new User(user.username, user.password));

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

    login(username, password) {
        const user = this.users.find(user => user.username === username);
        if (user && user.validate(password)) {
            localStorage.setItem('loggedIn', true);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('loggedIn');
    }

    getUsernames() {
        return JSON.parse(localStorage.getItem('usernames')) || [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authService = new AuthService();
    authService.loadUsers();

    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (authService.login(username, password)) {
                messageDiv.textContent = 'Succesvol ingelogd!';
                window.location.href = 'dashboard.html'; 
            } else {
                messageDiv.textContent = 'Foutieve gebruikersnaam of wachtwoord.';
            }
        });
    }

    if (localStorage.getItem('loggedIn')) {
        console.log('Gebruiker is ingelogd');
    } else {
        if (window.location.pathname !== '/login.html') {
            window.location.href = 'login.html';
        }
    }
});
