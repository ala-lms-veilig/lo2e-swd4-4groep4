// zijn er geb leeg
let users = JSON.parse(localStorage.getItem('users')) || {};

// Voeg regi functie
const registerForm = document.getElementById('registerForm');
if (registerForm) { // bent je op regpagi
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // bestaat geb
        if (users[newUsername]) {
            document.getElementById('registerMessage').innerHTML = 'Gebruikersnaam bestaat al.';
        } else {
            // nieuwe geb
            users[newUsername] = newPassword;
            
            // opslaan geb local
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('registerMessage').innerHTML = 'Registratie succesvol!';

            // na reg naar home
            setTimeout(() => {
                window.location.href = 'index.html'; // naar inlog
            }, 2000); // w8 2sec
        }
    });
}

// Haal gebr uit local
let storedUsers = JSON.parse(localStorage.getItem('users')) || {};

// inlog funtie voe
const loginForm = document.getElementById('loginForm');
if (loginForm) { // Controleer of login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Controleer of geb klopt
        if (storedUsers[username] && storedUsers[username] === password) {
            // ga home
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

    // klopt us en pas
    if (storedUsers[username] && storedUsers[username] === password) {
        // opslaan geb
        localStorage.setItem('loggedInUser', username);

        // naar home
        window.location.href = 'home.html';
    } else {
        document.getElementById('message').innerHTML = 'Ongeldige gebruikersnaam of wachtwoord';
    }
});
