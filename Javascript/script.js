document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const naam = document.getElementById("naam").value;
        const email = document.getElementById("email").value;
        const onderwerp = document.getElementById("onderwerp").value;
        const bericht = document.getElementById("bericht").value;

        const contactBericht = {
            naam,
            email,
            onderwerp,
            bericht,
            tijd: new Date().toLocaleString()
        };

        const opgeslagenBerichten = JSON.parse(localStorage.getItem("contactBerichten")) || [];

        opgeslagenBerichten.push(contactBericht);

        localStorage.setItem("contactBerichten", JSON.stringify(opgeslagenBerichten));

        contactForm.reset();

        alert("Je bericht is verzonden en opgeslagen.");
    });
}); 