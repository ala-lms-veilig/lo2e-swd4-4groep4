// Controleer of er al gebruikers in localStorage zijn, zo niet, maak een leeg object
let users = JSON.parse(localStorage.getItem('users')) || {};

// Voeg de registratie functionaliteit toe
const registerForm = document.getElementById('registerForm');
if (registerForm) { // Controleer of je op de registratiepagina bent
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Controleer of de gebruikersnaam al bestaat
        if (users[newUsername]) {
            document.getElementById('registerMessage').innerHTML = 'Gebruikersnaam bestaat al.';
        } else {
            // Voeg de nieuwe gebruiker toe aan het users object
            users[newUsername] = newPassword;
            
            // Sla de bijgewerkte gebruikers op in localStorage
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('registerMessage').innerHTML = 'Registratie succesvol!';

            // Na registratie, doorsturen naar de inlogpagina
            setTimeout(() => {
                window.location.href = 'index.html'; // Terug naar inlogpagina
            }, 2000); // Wacht 2 seconden voor doorsturen
        }
    });
}

// Haal de gebruikers uit localStorage
let storedUsers = JSON.parse(localStorage.getItem('users')) || {};

// Voeg de inlog functionaliteit toe
const loginForm = document.getElementById('loginForm');
if (loginForm) { // Controleer of je op de inlogpagina bent
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Controleer of de gebruikersnaam en wachtwoord correct zijn
        if (storedUsers[username] && storedUsers[username] === password) {
            // Redirect naar de homepage of dashboard
            window.location.href = 'home.html';
        } else {
            document.getElementById('message').innerHTML = 'Ongeldige gebruikersnaam of wachtwoord';
        }
    });
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Controleer of de gebruikersnaam en wachtwoord correct zijn
    if (storedUsers[username] && storedUsers[username] === password) {
        // Sla de gebruikersnaam op in localStorage
        localStorage.setItem('loggedInUser', username);

        // Redirect naar de homepagina
        window.location.href = 'home.html';
    } else {
        document.getElementById('message').innerHTML = 'Ongeldige gebruikersnaam of wachtwoord';
    }
});
