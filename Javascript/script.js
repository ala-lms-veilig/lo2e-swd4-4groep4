document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const naam = document.getElementById("naam").value;
        const email = document.getElementById("email").value;
        const onderwerp = document.getElementById("onderwerp").value;
        const bericht = document.getElementById("bericht").value;

        // Maak bericht object
        const contactBericht = {
            naam,
            email,
            onderwerp,
            bericht,
            tijd: new Date().toLocaleString()
        };

        // Haal bestaande berichten op uit localStorage
        const opgeslagenBerichten = JSON.parse(localStorage.getItem("contactBerichten")) || [];

        // Voeg nieuw bericht toe
        opgeslagenBerichten.push(contactBericht);

        // Sla de berichten op in localStorage
        localStorage.setItem("contactBerichten", JSON.stringify(opgeslagenBerichten));

        // Reset het formulier na succesvol opslaan
        contactForm.reset();

        alert("Je bericht is verzonden en opgeslagen.");
    });
}); 